import Suite from 'node-test';
import Web3 from 'web3';
import contentHash from 'content-hash';
import NAME_WHOISENS_ETH from 'whoisens-test-dataset/dataset/whoisens.eth.json';

const NAME_MAIN = NAME_WHOISENS_ETH.main_name;
const testingName = NAME_WHOISENS_ETH.eth_names[0];

const suite = new Suite('Third Party');

const networkURL = 'https://eth.gateway.whoisens.org';

suite.test('Web3.js to resolve name', async (t) => {
  const web3 = new Web3(networkURL);

  const address = await web3.eth.ens.getAddress(NAME_MAIN);
  t.equal(address.toLowerCase(), testingName.resolved_address);
});

suite.test(`Web3.js to get content hash`, async (t) => {
  const web3 = new Web3(networkURL);

  const result = await web3.eth.ens.getContenthash(NAME_MAIN);
  const content = contentHash.decode(result);

  t.truthy(testingName.resolved_content.includes(content));
});
