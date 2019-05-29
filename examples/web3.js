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
