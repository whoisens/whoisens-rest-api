# WhoisENS REST API

<p>
  <a href="https://travis-ci.org/whoisens/whoisens-api">
    <img src="https://api.travis-ci.org/whoisens/whoisens-api.svg?branch=master" alt="Build status">
  </a>

  <a href="https://github.com/whoisens/whoisens-api/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/whoisens/whoisens-api.svg" alt="license">
  </a>
</p>


WhoisENS REST API allows you to get owner/controller info, date expiration, resolve name/addresses using ENS.

For REST API refer to https://whoisens.org/api

> REST API Endpoint: https://api.whoisens.org


### How to use

You can use REST API from Node.js or directly from browser. CORS is enabled for all by default.

#### REST API

```javascript
const networkURL = 'https://api.whoisens.org';
const name = 'whoisens.eth';

(async () => {
  const forwardResolve = (await (await fetch(`${networkURL}/resolve/address/${name}`)).json()).result;
  console.log('Forward Resolve', forwardResolve);

  const reverseResolve = (await (await fetch(`${networkURL}/resolve/address/${forwardResolve.result}`)).json()).result;
  console.log('Reverse Resolve', reverseResolve);

  const contentHash = (await (await fetch(`${networkURL}/resolve/contenthash/${name}`)).json()).result;
  console.log('Content hash', contentHash);
})();
```

#### Directly connect to Node

You can use WhoisENS Ethereum Node directly with  third-party libraries, like Web3.js.

```javascript
import Web3 from 'web3';

const networkURL = 'https://eth.gateway.whoisens.org';
const name = 'whoisens.eth';

(async () => {
  const web3 = new Web3(Web3.givenProvider || networkURL);

  const forwardResolve = await web3.eth.ens.getAddress(name);
  console.log('Forward Resolve', forwardResolve);

  const contentHash = await web3.eth.ens.getContenthash(name);
  console.log('Content hash', contentHash);
})();

```

### Installation

If you are interesting in developing WhoisENS API or deploy you own copy, please see `INSTALL.md`.
