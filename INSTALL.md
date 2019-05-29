### Install (for production)

#### Install docker

1. Install [Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)

2. Copy SSL keys into `docker-files/certs` folder.

3. Deploy


```bash
npm run docker-deploy

# or if no Node.js installed

docker build . -t whoisens-api

docker stop whoisens-api
docker rm whoisens-api

# see env/README.md how to run on existing env
docker run -dit -p 80:80 -p 443:443 --name whoisens-api whoisens-api
```


### Install (for development)

```bash
npm ci
npm run serve:dev
```
