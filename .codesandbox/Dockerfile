FROM ubuntu:18.04

RUN dpkg --configure -a

ENV PYTHON_VERSION 3.7.7
ENV PYTHON_PIP_VERSION 20.1
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y install gcc mono-mcs \
    default-jre default-jdk nodejs npm \
    python3-pip python3 curl && \
    rm -rf /var/lib/apt/lists/*

RUN apt install -y make python build-essential

ENV NODE_VERSION=16.13.2
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
# RUN nvm install 16.13.2

WORKDIR /app
# COPY . /app

# RUN cd runner-test && npm install
# RUN cd compiler && npm install


EXPOSE 3000 8080
# CMD ["node", "compiler/src/index.js"]