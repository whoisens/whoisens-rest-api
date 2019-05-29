import Suite from 'node-test';
import NAME_WHOISENS_ETH from 'whoisens-test-dataset/dataset/whoisens.eth.json';

const NAME_MAIN = NAME_WHOISENS_ETH.main_name;
const OWNER = NAME_WHOISENS_ETH.owner;
const EXPIRES = NAME_WHOISENS_ETH.expires;

const suite = new Suite('ENS');

const networkURL = `http://localhost:8089`;

function isResult(str) {
  return str && str !== '0x';
}

(async () => {
    suite.test(`get /`, async (t) => {
      const response = await fetch(`${networkURL}/`);
      const result = await response.text();

      t.equal('Please refer to https://whoisens.org/api for more info how to use REST API', result);
    });

    for (const ethName of NAME_WHOISENS_ETH.eth_names) {
      const name = ethName.name;

      suite.test(`get Eth Name owner for: ${name}`, async (t) => {
        const response = await (await fetch(`${networkURL}/name/owner/${name}`)).json();
        const result = response.result;

        t.falsey(result.error);

        t.equal(result.data.nameMain, NAME_MAIN);
        t.equal(result.data.address, name);
        t.equal(result.data.addressParent, ethName.parent);

        t.equal(result.result, OWNER);
      });

      suite.test(`get Eth Name expiration date for: ${name}`, async (t) => {
        const response = await (await fetch(`${networkURL}/name/expires/${name}`)).json();
        const result = response.result;

        t.falsey(result.error);

        t.equal(result.result, EXPIRES);
      });

      suite.test(`get Controller for: ${name}`, async (t) => {
        const response = await (await fetch(`${networkURL}/controller/owner/${name}`)).json();
        const result = response.result;

        t.falsey(result.error);

        t.equal(result.result, ethName.controller);
      });

      suite.test(`get Resolve address for: ${name}`, async (t) => {
        const response = await (await fetch(`${networkURL}/resolve/address/${name}`)).json();
        const result = response.result;

        t.equal(result.data.addressType, 'name');

        if (!ethName.forward_resolver) {
          t.equal(result.error, 'Resolver is not set');
        } else {
          t.falsey(result.error);
          t.equal(result.data.resolveType, 'forward');
        }

        if (isResult(result.result) || isResult(ethName.resolved_address)) {
          t.equal(result.result, ethName.resolved_address);
        }
      });

      let resolvedAddress = ethName.resolved_address;
      const reverseResolvedAddress = ethName.reverse_resolved_address;

      if (resolvedAddress && reverseResolvedAddress) {
        suite.test(`get Reverse address for: ${resolvedAddress}`, async (t) => {
          const response = await (await fetch(`${networkURL}/resolve/address/${resolvedAddress}`)).json();
          const result = response.result;

          t.falsey(result.error);

          t.equal(result.data.addressType, 'address');
          t.equal(result.data.resolveType, 'reverse');
          t.equal(result.data.reverseAddress, resolvedAddress.slice(2) + '.addr.reverse');
          t.equal(result.data.addressParent, 'addr.reverse');

          if (reverseResolvedAddress) {
            t.equal(result.result, reverseResolvedAddress);
          }
        });

        const resolvedAddress2 = resolvedAddress.slice(2) + '.addr.reverse';
        suite.test(`get Reverse address for: ${resolvedAddress2}`, async (t) => {
          const response = await (await fetch(`${networkURL}/resolve/address/${resolvedAddress2}`)).json();
          const result = response.result;

          t.falsey(result.error);

          t.equal(result.data.addressType, 'address');
          t.equal(result.data.resolveType, 'reverse');
          t.equal(result.data.reverseAddress, resolvedAddress2);
          t.equal(result.data.addressParent, 'addr.reverse');

          if (reverseResolvedAddress) {
            t.equal(result.result, reverseResolvedAddress);
          }
        });
      }

      if (isResult(ethName.resolved_address)) {
        suite.test(`get content hash for: ${name}`, async (t) => {
          const response = await (await fetch(`${networkURL}/resolve/contenthash/${name}`)).json();
          const result = response.result;

          t.falsey(result.error);

          t.equal(result.result, ethName.resolved_content);
        });
      }
    }
  }
)();
