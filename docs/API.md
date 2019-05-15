
# WhoisENS REST API

>  v1.0.0

Provided REST API allows you to resolve Ethereum names into addresses and vise-versa, getting information about Ethereum name , and contract addresses and methods that was called.


## Get Name owner

### GET /name/owner/*:address*

Gets info about **owner** of Ethereum address.

| Parameter | Type | Description |
|-------------|--------|-----------------|-------|
|address|String| Ethereum address, e.g. **whoisens.eth**|

Response

```json
{"result": "0x...."}
```


## Get Controller owner

### GET /registrar/owner/:address

Gets info about **controller** of Ethereum address (who allows to make changes to that name).

| Parameter | Type | Description |
|-------------|--------|-----------------|-------|
|address|String| Ethereum name or address e.g. **whoisens.eth**|

Response

```json
{"result": "0x...."}
```

## Get expiration date

### GET /registrar/expires/:address

Gets info when name is expires. Result returns in UNIX time (in seconds).

| Parameter | Type | Description |
|-------------|--------|-----------------|-------|
|address|String| Ethereum address, e.g. **whoisens.eth**|

Response

```json
{"result": 1588711276}
```

## Resolve name/address

### GET /resolve/:address

Resolve name to address if name is provided, and resolve address to name if revert name is exists in ENS.

Also return content hash (ipfs:// or bzz://) for forward lookup (if name is provided) if it presents in ENS.

| Parameter | Type | Description |
|-------------|--------|-----------------|-------|
|address|String| Ethereum name or address e.g. **whoisens.eth**, **0xf304e...**, **f304e...55ad9.addr.reverse** |

If *address* parameter is a **name**, e.g. **whoisens.eth**, then **address** will be returned. If *address* parameter is an **address**, e.g. **0xf304e...**, **f304e...55ad9.addr.reverse**, then Ethereum name will be returned if reverse record exists.

| Parameter | Type | Description |
|-------------|--------|-----------------|-------|
|address|String| Ethereum address, e.g. **whoisens.eth**|

Response for name (forward lookup)

```json
{
  "type": "forward",
  "address":"0x...",
  "content":"ipfs://<HASH HERE>"
}
```

Response for address (reverse lookup)

```json
{
  "type": "reverse",
  "result": "xxxxxxx.eth"
}
```
