FROM pytorch/pytorch:1.8.1-cuda10.2-cudnn7-runtime

RUN pip install flask flask-caching
RUN pip install transformers==3.3.1 sentence-transformers==0.3.8 pandas==1.1.2 faiss-cpu==1.6.1 numpy==1.19.2 folium==0.2.1 streamlit==0.62.0
EXPOSE 5000 
ENV FLASK_ENV=production    

COPY models /app/models
COPY . /app
WORKDIR /app
RUN python load-model.py

CMD ["python", "main.py"]

