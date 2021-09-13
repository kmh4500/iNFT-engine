from flask import Flask, request, jsonify, render_template
import torch
import time
import faiss
import pickle
import torch
import numpy as np
import pandas as pd
import threading
from sentence_transformers import SentenceTransformer
from vector_engine.utils import vector_search, id2details
from transformers import PreTrainedTokenizerFast, GPT2LMHeadModel, GPT2TokenizerFast, GPT2Tokenizer, GPT2Model
from flask_caching import Cache
from requests import get
import os
import re
import logging

os.environ['TORCH_HOME'] = 'models'

lock = threading.Lock() 

config = {
        "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
        "CACHE_DEFAULT_TIMEOUT": 300
        }

app = Flask(__name__)
# tell Flask to use the above defined config
app.config.from_mapping(config)
cache = Cache(app)

logging.basicConfig(filename='../client/public/main.log', filemode='w', level=logging.DEBUG) 
logging.info("model loading...")

# Model & Tokenizer loading

def read_data(data="data/elon_core_memories.csv"):
    lines = []
    for data in ["data/elon_core_memories.txt", "data/elon_clubhouse.txt", "data/lex.txt", "data/joe-rogan.txt"]:
        with open(data) as my_file:
            lines += my_file.read().splitlines()
    return lines

def load_bert_model(name="distilbert-base-nli-stsb-mean-tokens"):
    """Instantiate a sentence-level DistilBERT model."""
    return SentenceTransformer(name)

def load_gpt2_model():
    return GPT2LMHeadModel.from_pretrained('gpt2-xl', cache_dir = "models/").to('cuda')

def load_gpt2_tokenizer():
    return GPT2Tokenizer.from_pretrained('gpt2-xl', cache_dir = "models/")

def load_faiss_index(model, data):
    # Check if GPU is available and use it
    if torch.cuda.is_available():
        model = model.to(torch.device("cuda"))
    logging.info(model.device)
    embeddings = model.encode(data, show_progress_bar=True)
    # Step 1: Change data type
    embeddings = np.array([embedding for embedding in embeddings]).astype("float32")
    # Step 2: Instantiate the index
    index = faiss.IndexFlatL2(embeddings.shape[1])
    # Step 3: Pass the index to IndexIDMap
    index = faiss.IndexIDMap(index)
    # Step 4: Add vectors and their IDs
    ids = np.array(list(range(0, len(data))))
    index.add_with_ids(embeddings, ids)
    logging.info(f"Number of vectors in the Faiss index: {index.ntotal}")

    return index

def generate_text(model, tokenizer, sequence, max_length):
    ids = tokenizer.encode(f'{sequence}', return_tensors='pt').to('cuda')
    final_outputs = model.generate(
        ids,
        do_sample=True,
        max_length=len(sequence) + 100,
        pad_token_id=model.config.eos_token_id,
        top_k=50,
        top_p=0.95,
        temparature=0.2,
        length_penalty=2.0
    )
    result = tokenizer.decode(final_outputs[:, ids.shape[-1]:][0], skip_special_tokens=True)
    logging.info(result)
    result = result[:result.find("User:")]
    return result.strip()

default_data = read_data()
model = load_bert_model()
default_faiss_index = load_faiss_index(model, default_data)
gpt2model = load_gpt2_model()
tokenizer = load_gpt2_tokenizer()
faiss_dict = {}
data_dict = {}

logging.info("complete model loading")

@app.route('/build/<channel>', methods=['POST'])
def build(channel):
    data = request.json['data']
    logging.info(channel)
    logging.info(data)
    if not channel or not data:
        return 'please provide channel and data', 200
    data_list = data.split(',')
    lines = []
    for url in data_list:
        response = get(url)
        # ignore too big file, invalid files
        if response and response.content and len(response.content) < 1000000:
            lines += response.content.decode('utf-8').splitlines()
    logging.info(lines)
    if lines:
        faiss_dict[channel] = load_faiss_index(model, lines)
        data_dict[channel] = lines
        cache.clear()
        return 'done:', 200
    else:
        return 'invalid data', 500

@app.route('/has_channel', methods=['GET'])
def has_channel():
    channel = request.args.get('channel', default = "", type = str)
    return {has_channel: channel in faiss_dict}, 200

##
# Get post request page.
@app.route('/chat', methods=['GET'])
@cache.cached(timeout=600, query_string=True)
def generate():
    context = request.args.get('context', default = "", type = str)
    user_input = request.args.get('message', default = "", type = str)
    channel = request.args.get('channel', default = "", type = str)
    name = request.args.get('name', default = "Elon", type = str)
    faiss_index = default_faiss_index
    data = default_data
    if channel and channel in faiss_dict:
        faiss_index = faiss_dict[channel]
        data = data_dict[channel]
    num_results = 3
    # Fetch results
    if user_input:
        # Get paper IDs
        D, I = vector_search([user_input], model, faiss_index, num_results)
        memories = []
        for i in I[0]:
            if i + 1 < len(data) and data[i].find("User") >= 0:
                memories.append(data[i])
                memories.append(data[i + 1])
            else:
                memories.append(data[i])
        # Get individual results
        logging.info(memories)
        prompt = (
                f"The following is a conversation between User and {name}\n"
                f"{context}\n"
                )
        for memory in memories:
            if len(memory) > 100:
                memory = memory[:100]
            prompt += memory + '\n'
        prompt += (
                f"User: What is your name?\n"
                f"{name}: My name is {name}\n"
                f"User: {user_input}\n"
                f"{name}:"
                )
        logging.info(prompt)
        if lock.locked():
            results = memories[0].replace("User:", "").replace(f"{name}:", "").strip() 
            logging.info(results)
            return results
        lock.acquire()
        results = generate_text(gpt2model, tokenizer, prompt, 400)
        results = results.replace(f"{name}:", "")
        lock.release()
        logging.info(results)
        return results, 200

##
# Sever health checking page.
@app.route('/healthz', methods=["GET"])
def health_check():
    return "Health", 200


##
# Main page.
@app.route('/')
def main():
    return "Hello World", 200


if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')
