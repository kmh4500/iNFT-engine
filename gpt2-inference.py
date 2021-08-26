from transformers import PreTrainedTokenizerFast, GPT2LMHeadModel, GPT2TokenizerFast, GPT2Tokenizer, GPT2Model
import torch

torch.cuda.is_available()
device = 'cuda' if torch.cuda.is_available() else 'cpu'

def generate_text(sequence, max_length):
    model = GPT2LMHeadModel.from_pretrained('gpt2-xl').to(device)
    tokenizer = GPT2Tokenizer.from_pretrained('gpt2-xl')
    ids = tokenizer.encode(f'{sequence}', return_tensors='pt').to(device)
    final_outputs = model.generate(
        ids,
        do_sample=True,
        max_length=max_length,
        pad_token_id=model.config.eos_token_id,
        top_k=50,
        top_p=0.95,
    )
    print(tokenizer.decode(final_outputs[0], skip_special_tokens=True))

generate_text('Elon was born in 1974 and wants to go to mars. The following is conversation with User and Elon.\nUser: What is your name?\nElon: Elon Musk.\nUser: How old are you?\nElon:', 100)
