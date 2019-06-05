# WhoisENS REST API

<p>
  <a href="https://travis-ci.org/whoisens/whoisens-rest-api">
    <img src="https://api.travis-ci.org/whoisens/whoisens-rest-api.svg?branch=master" alt="Build status">
  </a>

  <a href="https://github.com/whoisens/whoisens-rest-api/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/whoisens/whoisens-rest-api.svg" alt="license">
  </a>
</p>


WhoisENS REST API utilize [whoisens-lib](https://github.com/whoisens/whoisens-lib) allows you to get owner/controller info, date expiration, resolve name/addresses using ENS via HTTP REST API.


> REST API Documentation: [https://whoisens.org/api](https://whoisens.org/api)

> REST API Endpoint: [https://api.whoisens.org](https://api.whoisens.org)


### How to use

You can use REST API from Node.js or directly from browser. CORS is enabled for all by default.

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

### Installation

If you are interesting in developing WhoisENS API or deploy you own copy, please see [Installation](./INSTALL.md)
