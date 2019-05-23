import fetch from 'node-fetch';
import restify from 'restify';
import errors from 'restify-errors';
import ENS from 'whoisens-lib';

const server = restify.createServer({});

global.fetch = fetch;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const networkName = 'mainnet';
const networkURL = 'https://eth.gateway.whoisens.org';

server.get('/', async (req, res, next) => {
  try {
    res.send(`Please refer to https://whoisens.org/api for more info how to use REST API`, {
      'Content-type': 'text/plain'
    });

    return next();
  } catch(error) {
    console.error(error);
    return next(new errors.InternalServerError(error));
  }
});

server.get('/name/owner/:address', async (req, res, next) => {
  try {
    const ens = new ENS(networkName, networkURL);
    ens.init(req.params.address);

    res.send({
      result: await ens.getOwner()
    });

    return next();
  } catch(error) {
    console.error(error);
    return next(new errors.InternalServerError(error));
  }
});

server.get('/name/expires/:address', async (req, res, next) => {
  try {
    const ens = new ENS(networkName, networkURL);
    ens.init(req.params.address);

    res.send({
      result: await ens.getExpirationDate()
    });

    return next();
  } catch(error) {
    console.error(error);
    return next(new errors.InternalServerError(error));
  }
});

server.get('/controller/owner/:address', async (req, res, next) => {
  try {
    const ens = new ENS(networkName, networkURL);
    ens.init(req.params.address);

    res.send({
      result: await ens.getController()
    });

    return next();
  } catch(error) {
    return next(new errors.InternalServerError(error));
  }
});

server.get('/resolve/address/:address', async (req, res, next) => {
  try {
    const ens = new ENS(networkName, networkURL);
    ens.init(req.params.address);

    res.send({
      result: await ens.resolve()
    });

    return next();
  } catch(error) {
    console.error(error);
    return next(new errors.InternalServerError(error));
  }
});

server.get('/resolve/contenthash/:address', async (req, res, next) => {
  try {
    const ens = new ENS(networkName, networkURL);
    ens.init(req.params.address);

    res.send({
      result: await ens.getContentHash()
    });

    return next();
  } catch(error) {
    console.error(error);
    return next(new errors.InternalServerError(error));
  }
});

server.on('restifyError', function(req, res, err, cb) {
  return cb();
});

server.listen(8089, function() {
  console.log('%s listening at %s', server.name, server.url);
});
