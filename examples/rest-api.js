import fetch from 'node-fetch';

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

