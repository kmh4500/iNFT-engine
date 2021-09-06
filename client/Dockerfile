FROM pytorch/pytorch:1.8.1-cuda10.2-cudnn7-runtime


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

ENV NODE_ENV production
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ./start.sh
