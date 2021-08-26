# Building a iNFT engine with AI Network
This repository contains the code for the following Medium blogs:
- [How to build a iNFT with AI Network](https://ainetwork.ai)


## How to deploy the Streamlit app locally with Docker ##
Assuming docker is running on your machine and you have a docker account, do the following:
- Build the image

``` bash
docker build -t <USERNAME>/<YOUR_IMAGE_NAME> .
```

- Run the image

``` bash
docker run -p 5000:5000 <USERNAME>/<YOUR_IMAGE_NAME>
```

- Open your browser and go to `http://localhost:5000/`
