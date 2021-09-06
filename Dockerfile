FROM pytorch/pytorch:1.8.1-cuda10.2-cudnn7-runtime

RUN pip install flask flask-caching
RUN pip install transformers==3.3.1 sentence-transformers==0.3.8 pandas==1.1.2 faiss-cpu==1.6.1 numpy==1.19.2 folium==0.2.1 streamlit==0.62.0

ENV NODE_VERSION=12.6.0
RUN apt update
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

COPY . /app

WORKDIR /app
RUN cd backend && (python load-model.py || true)

ENV NODE_ENV production
ENV FLASK_ENV=production
RUN cd client && npm install
RUN cd client && npm run build

EXPOSE 3000

CMD ./start.sh
