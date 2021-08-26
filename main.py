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
import os

os.environ['TORCH_HOME'] = 'models'

lock = threading.Lock() 

config = {
        "DEBUG": True,          # some Flask specific configs
        "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
        "CACHE_DEFAULT_TIMEOUT": 300
        }

app = Flask(__name__)
# tell Flask to use the above defined config
app.config.from_mapping(config)
cache = Cache(app)

print("model loading...")

# Model & Tokenizer loading

def read_data(data="data/elon_core_memories.csv"):
    lines = []
    for data in ["data/elon_core_memories.txt", "data/elon_clubhouse.txt", "data/lex.txt", "data/joe-rogan.txt"]:
        with open(data) as my_file:
            lines += my_file.readlines()
    return lines

def load_bert_model(name="distilbert-base-nli-stsb-mean-tokens"):
    """Instantiate a sentence-level DistilBERT model."""
    return SentenceTransformer(name)

def load_gpt2_model():
    return GPT2LMHeadModel.from_pretrained('gpt2-xl', cache_dir = "models/").to('cuda')

def load_gpt2_tokenizer():
    return GPT2Tokenizer.from_pretrained('gpt2-xl', cache_dir = "models/")

def load_faiss_index(model, df):
    # Check if GPU is available and use it
    if torch.cuda.is_available():
        model = model.to(torch.device("cuda"))
    print(model.device)
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
    print(f"Number of vectors in the Faiss index: {index.ntotal}")

    return index

def generate_text(model, tokenizer, sequence, max_length):
    ids = tokenizer.encode(f'{sequence}', return_tensors='pt').to('cuda')
    max_length = len(sequence) + 100
    final_outputs = model.generate(
        ids,
        do_sample=True,
        max_length=max_length,
        pad_token_id=model.config.eos_token_id,
        top_k=50,
        top_p=0.95,
        temparature=0.2,
        length_penalty=2.0
    )
    result = tokenizer.decode(final_outputs[:, ids.shape[-1]:][0], skip_special_tokens=True)
    result = result[:result.find("User:")]
    return result.strip()

data = read_data()
model = load_bert_model()
faiss_index = load_faiss_index(model, data)
gpt2model = load_gpt2_model()
tokenizer = load_gpt2_tokenizer()

print("complete model loading")


##
# Get post request page.
@app.route('/chat', methods=['GET'])
@cache.cached(timeout=600, query_string=True)
def generate():
    context = request.args.get('context', default = "", type = str)
    user_input = request.args.get('message', default = "", type = str)

    num_results = 10
    # Fetch results
    if user_input:
        # Get paper IDs
        D, I = vector_search([user_input], model, faiss_index, num_results)
        # memories = [data[i] for i in I[0]]
        print (I[0])
        memories = []
        for i in I[0]:
            if i + 1 < len(data) and data[i].find("User") > 0:
                memories.append(data[i + 1])
            else:
                memories.append(data[i])
        # Get individual results
        print (memories)
        prompt = ""
        for memory in memories:
            prompt += memory[0] + '\n'
        prompt += """
The following is a conversation between User and Elon.
""" + context + """

User: What is your name?
Elon: My name is Elon Musk.
User: """ + user_input + "\nElon:"
        if lock.locked():
            results = memories[0].replace("User:", "").replace("Elon:", "").strip() 
            print (results)
            return results
        lock.acquire()
        results = generate_text(gpt2model, tokenizer, prompt, 500)
        lock.release()
        print (results)
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
