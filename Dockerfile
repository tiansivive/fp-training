#Shamelessly based off https://github.com/yunabe/tslab-examples/blob/master/Dockerfile_prebuilt


# Dockerfile to build a prebuilt image to run this example on mybinder.org.
FROM node:hydrogen-alpine

# cache-busting to force rebuild the image in mybinder.org.
RUN echo cache-busting-6

RUN apt-get update
RUN apt-get install -y libzmq3-dev cmake python3-pip

RUN rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir -U jupyterlab notebook jupyterhub jupyterthemes

#Set up jupyter theme
RUN jt -t oceans16 -f fira -fs 11

# Support UTF-8 filename in Python (https://stackoverflow.com/a/31754469)
ENV LC_CTYPE=C.UTF-8

# Check the uid of node is 1000 to follow the convention of mybinder to use this image from mybinder.org.
# https://mybinder.readthedocs.io/en/latest/tutorials/dockerfile.html#preparing-your-dockerfile
# Notes:
# Don't use ARG NB_USER here. It's overwritten with jovyan.
ENV HOME /home/node
RUN id -u node | grep -c "^1000$"
USER node
WORKDIR ${HOME}

# Install tslab
RUN mkdir ~/.npm-global
ENV PATH $PATH:${HOME}/.npm-global/bin
RUN npm config set prefix '~/.npm-global'

RUN npm install -g tslab@1.0.17
RUN tslab install

# Set up the project
RUN git clone --depth 1 https://github.com/tiansivive/fp-training.git
WORKDIR ${HOME}/fp-training

RUN npm install


# Notes:
# 1. Do not use ENTRYPOINT because mybinder need to run a custom command.
# 2. To use JupyterLab, replace "notebook" with "lab".
# 3. Set --allow-root in case you want to run jupyter as root.
CMD ["jupyter", "notebook", "--ip=0.0.0.0"]


