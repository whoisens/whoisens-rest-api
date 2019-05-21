# Whois ENS REST API  
  
>  API Version: v2.0.0  
>  Document Version: v2.0.1  
>  REST API Endpoint: https://api.whoisens.org


Provided comprehensive REST API allows to get any info about Ethereum address.
  
  
# Used Interfaces

```typescript
enum EthAddressType {
    name = 'name',
    address = 'address',
    error = 'error'
}

interface IEthJSONRCP {
    request: {
        id: number;
        contractAddress: string;
        contractMethod: string;
        payload: string;
        parameters: object;
    },
    response: IJSONRCPResponse
}

interface IJSONRCPResponse {
    id: number;
    jsonrpc: string;
    result: string;
    error?: object
}

interface IAdditionalDataInfo {
    address?: string;
    addressParent?: string;
    addressType?: EthAddressType;
    nameMain?: string;
    resolveType?: string;
    reverseAddress?: string;
}
```

# REST API

## Get Name owner  
  
### GET /name/owner/*:address*  
  
Gets info about **owner** of Ethereum address.  
  
| Parameter | Type | Description |  
|-------------|--------|-----------------|-------|  
|address|String| Ethereum address, e.g. **test8.test.whoisens.eth**|  
  
Response  
  
```json  
{
  "result": {
    "ethRCP": IEthJSONRCP,
    "result": "0xf304e02ae3b43806181d1d341f72f5b440e55ad9",
    "data": {
      "address": "test8.test.whoisens.eth",
      "nameMain": "whoisens.eth",
      "addressParent": "test.whoisens.eth"
    }
  }
}
```  
  

## Get expiration date  
  
### GET /name/expires/:address  
  
Gets expiration date for Ethereum name. Result returns in UNIX time (in seconds).  
  
| Parameter | Type | Description |  
|-------------|--------|-----------------|-------|  
|address|String| Ethereum address, e.g. **whoisens.eth**|  
  
Response  
  
```json  
{
  "result": {
    "ethRCP": IEthJSONRCP,
    "result": 1588734843,
    "data": IAdditionalDataInfo
  }
} 
```  


## Get Controller owner  
  
### GET /controller/owner/:address  
  
Gets info about **controller** of Ethereum address (who allows to make changes to that name).  
  
| Parameter | Type | Description |  
|-------------|--------|-----------------|-------|  
|address|String| Ethereum name or address e.g. **whoisens.eth**|  
  
Response  
  
```json  
{
  "result": {
    "ethRCP": IEthJSONRCP,
    "result": "0x....",
    "data": IAdditionalDataInfo
  }
} 
```  
  
  
## Resolve name/address  
  
### GET /resolve/address/:address  
  
Resolve name to address if name is provided, and resolve address to name if revert name is exists in ENS.  
  
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
  "result": {
    "ethRCP": IEthJSONRCP,
    "result": "0x5b854fc85bb7b2b3bdb78bd8dd85832121bd082c",
    "data": {  
      "resolveType": "forward",  
      "address": "whoisens.eth",  
      "nameMain": "whoisens.eth",  
      "addressParent": "eth"  
    }
  }
} 
```  
  
Response for address (reverse lookup)  
  
```json  
{
  "result": {
    "ethRCP": IEthJSONRCP,
    "result": "whoisens.eth",
    "data": {  
      "resolveType": "reverse",  
      "reverseAddress": "5b854fc85bb7b2b3bdb78bd8dd85832121bd082c.addr.reverse",  
      "address": "0x5b854fc85bb7b2b3bdb78bd8dd85832121bd082c",  
      "addressParent": "addr.reverse"  
    }
  }
}  
```


## Resolve content ipfs:// bzz://
  
### GET /resolve/contenthash/:address  
  
Also return content hash (ipfs:// or bzz://) for forward lookup (if name is provided) if it presents in ENS.  

```json  
{
  "result": {
    "ethRCP": IEthJSONRCP,
    "result": "ipfs://QmNxpPDsfY4vTm1VR1rzLJaZA7sfzyESdrPXNWbqqabW1a",
    "data": {
      "address": "whoisens.eth",
      "nameMain": "whoisens.eth",
      "addressParent": "eth"
    }
  }
} 
```
