[![NPM version](https://img.shields.io/npm/v/clannad-sdk.svg)](https://www.npmjs.com/package/clannad-sdk) [![Downloads](https://img.shields.io/npm/dm/clannad-sdk.svg)](http://badge.fury.io/js/clannad-sdk)

# clannad-sdk
back-end HTTP SDK for clannad

## initail

```
import CS from 'clannad-sdk';

const cs = new CS(options);
```

**key in options**

| key | type | default | descption |
| ---- | ---- | ------- | ----- |
| host | String | 127.0.0.1 |  |
| token | String | | project token from ROOT, will be send as headers['X-Token'] |
| projectName | String | test | projectName for request |

## basic handle

#### cs.auth

```
const result = await cs.list({token});
```

| field | type | descption |
| --- | --- | --- |
| token | String | token from your auth system (confrim by `clannad.auth`), will replace token in options |

response: `200 OK {auth}`

#### cs.list

```
const result = await cs.list({tableName, token, selector});
```

**fields in selector**

| field | type | descption |
| --- | --- | --- |
| offset | Number | default 0（only list could use） |
| limit | Number | default 30 (only list could use) |
| sort | String | sort by one field, default `createdAt` (only list could use) |
| asc | Boolean | default desc，you could set `true` to get asc (only list could use) |
| populate | Object | for mongo populate handle, such as `{"path": "field1","select": "name",populete:{"path":...}}` |
| select | Object | for select fields, such as `["field1","field2",...]` |
| params | Object | for mongoose conditions, such as `{"field1":{"$gte":21},"field2":"duang",...}` |

response: `200 OK [{_id: ..., ...}, ...]`

#### cs.count

```
const result = await cs.count({tableName, token, params});
```

response: `200 OK {count}`

#### cs.detail

```
const result = await cs.detail({tableName, token, selector});
```

response: `200 OK {_id: ..., ...}`

#### cs.aggregate

```
const result = await cs.detail({tableName, token, params, group, sort});
```

| field | type | descption |
| --- | --- | --- |
| params | Object | for mongoose conditions, such as `{"field1":{"$gte":21},"field2":"duang",...}` |
| group | Object | a JSON about $group operator to this aggregate pipeline, such as `{"_id":"$field1","num":{"$sum":1}}` |
| sort | Object | a JSON about sorts all input documents, such as `{"field1": -1, "field2": 1}` |

response: `200 OK [{_id: ..., ...}, ...]`

#### cs.add

```
const result = await cs.add({tableName, token, data});
```

response: `200 OK {id}`

#### cs.edit

```
const result = await cs.edit({tableName, token, params, data});
```

response: `204 No content`

#### cs.delete

```
const result = await cs.delete({tableName, token, params});
```

response: `204 No content`

## develop

```
$ make dev
```
