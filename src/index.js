import fetch from 'node-fetch';
import restify from 'restify';
import errors from 'restify-errors';
import {ENS, EthNameType} from 'whoisens-lib/dist/index.js';

const server = restify.createServer({});

global.fetch = fetch;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

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
    const ens = new ENS();
    await ens.init(req.params.address);
    const result = await ens.getNameOwner();

    res.send({
      result: result.result
    });

    return next();
  } catch(error) {
    console.error(error);
    return next(new errors.InternalServerError(error));
  }
});

server.get('/registrar/owner/:address', async (req, res, next) => {
  try {
    const ens = new ENS();
    await ens.init(req.params.address);
    const result = await ens.getRegistrarOwner();

    res.send({
      result: result.result
    });

    return next();
  } catch(error) {
    return next(new errors.InternalServerError(error));
  }
});

server.get('/registrar/expires/:address', async (req, res, next) => {
  try {
    const ens = new ENS();
    await ens.init(req.params.address);
    const result = await ens.getRegistrarExpired();


    res.send({
      result: result.result,
    });

    return next();
  } catch(error) {
    console.error(error);
    return next(new errors.InternalServerError(error));
  }
});

server.get('/resolve/:address', async (req, res, next) => {
  try {
    const ens = new ENS();
    await ens.init(req.params.address);

    if (ens.ethNameType === 'name') {
      const resultAddress = await ens.getResolverAddress();
      const resultContent = await ens.getContentHash();

      res.send({
        type: 'forward',
        address: resultAddress.result,
        content: resultContent.result
      });
    } else {
      const result = await ens.getRevertResolver();

      res.send({
        type: 'reverse',
        result: result.result
      });
    }

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
