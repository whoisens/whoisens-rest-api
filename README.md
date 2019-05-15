# WhoisENS API

WhoisENS API allows you get owner/controller info, date expiration, resolve name/addresses using ENS.

For REST API refer to https://whoisens.org/api

> REST API Endpoint: https://api.whoisens.org


### Install (for production)

#### Install docker

```bash
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
   
sudo apt-get install -y docker-ce docker-ce-cli
```

Copy SSL keys into `docker-files/certs` folder.


1. Deploy and ensure it works

```bash
npm run docker-deploy-dev
```

2. Generate archive and deploy it to server

```bash
docker save whoisens-api > /tmp/whoisens-api.tar
gzip /tmp/whoisens-api.tar

scp /tmp/whoisens-api.tar.gz root@whoisens.org:/tmp

ssh root@whoisens.org
cd /tmp
sudo docker load --input whoisens-api.tar.gz

sudo docker stop whoisens-api
docker rm whoisens-api
sudo docker run -dit -p 80:80 -p 443:443 --name whoisens-api whoisens-api
```


#### Debug Docker

```bash
npm run docker-debug
```

#### Install (for Development)

```bash
npm ci
npm run serve:dev
```
