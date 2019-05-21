# Whois ENS API

<p>
  <a href="https://travis-ci.org/whoisens/whoisens-api">
    <img src="https://api.travis-ci.org/whoisens/whoisens-api.svg?branch=master" alt="Build status">
  </a>

  <a href="https://github.com/whoisens/whoisens-api/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/whoisens/whoisens-api.svg" alt="license">
  </a>
</p>


Whois ENS REST API allows you get owner/controller info, date expiration, resolve name/addresses using ENS.

For REST API refer to https://whoisens.org/api

> REST API Endpoint: https://api.whoisens.org


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
