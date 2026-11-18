"""Voice lines with YarnGPT2, a free open-source Nigerian-accent TTS model, on CPU.

Usage: /root/yarn/.venv/bin/python tools/yarn_tts.py <speaker> <out.wav> "<text>" [more out/text pairs]
Setup (once): /root/yarn holds the yarngpt repo and a venv with torch, outetts==0.2.3, uroman,
transformers==4.47.1, inflect. Models download from Hugging Face into /root/yarn/models.
"""
import sys

sys.path.insert(0, "/root/yarn")
import torch, torchaudio
from huggingface_hub import hf_hub_download
from transformers import AutoModelForCausalLM
from yarngpt.audiotokenizer import AudioTokenizerV2

CACHE = "/root/yarn/models"
torch.set_num_threads(4)
cfg = hf_hub_download("novateur/WavTokenizer-medium-speech-75token",
                      "wavtokenizer_mediumdata_frame75_3s_nq1_code4096_dim512_kmeans200_attn.yaml", cache_dir=CACHE)
ckpt = hf_hub_download("novateur/WavTokenizer-large-speech-75token", "wavtokenizer_large_speech_320_v2.ckpt", cache_dir=CACHE)
tok = AudioTokenizerV2("saheedniyi/YarnGPT2", ckpt, cfg)
model = AutoModelForCausalLM.from_pretrained("saheedniyi/YarnGPT2", torch_dtype="auto", cache_dir=CACHE).to(tok.device)

speaker, pairs = sys.argv[1], sys.argv[2:]
for out, text in zip(pairs[0::2], pairs[1::2]):
    ids = tok.tokenize_prompt(tok.create_prompt(text, lang="english", speaker_name=speaker))
    gen = model.generate(input_ids=ids, temperature=0.1, repetition_penalty=1.1, max_length=4000)
    audio = tok.get_audio(tok.get_codes(gen))
    torchaudio.save(out, audio, sample_rate=24000)
    print("ok", out, round(audio.shape[-1] / 24000, 1), "s", flush=True)
