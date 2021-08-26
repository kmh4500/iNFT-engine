
from sentence_transformers import SentenceTransformer
from transformers import PreTrainedTokenizerFast, GPT2LMHeadModel, GPT2TokenizerFast, GPT2Tokenizer, GPT2Model
import os

os.environ['TORCH_HOME'] = 'models'

SentenceTransformer('distilbert-base-nli-stsb-mean-tokens')
GPT2LMHeadModel.from_pretrained('gpt2-xl', cache_dir="models/")
GPT2Tokenizer.from_pretrained('gpt2-xl', cache_dir="models/")



