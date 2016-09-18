import rp from 'request-promise';

const parseError = (err) => {
  throw err.error;
};

const getQS = (selector) => {
  var qs = {};
  if (!selector) return qs;
  ['offset', 'limit', 'sort', 'asc'].forEach((key) => {
    if (selector[key]) qs[key] = selector[key];
  });
  ['populate', 'select', 'params'].forEach((key) => {
    if (selector[key]) qs[key] = JSON.stringify(selector[key]);
  });
  return qs;
};

class ClannadSDK {
  constructor(config) {
    var {host, projectName, token} = config;
    this.url = `${host || '127.0.0.1'}/${projectName || 'test'}`;
    this.token = token || '';
  }
  auth({token} = {}) {
    return rp.get({
      url: `${this.url}/_auth`,
      headers: {'X-Token': this.token || token},
      json: true
    }).catch(parseError);
  }
  list({tableName, token, selector} = {}) {
    return rp.get({
      url: `${this.url}/${tableName}`,
      headers: {'X-Token': this.token || token},
      qs: getQS(selector),
      json: true
    }).catch(parseError);
  }
  count({tableName, token, params} = {}) {
    return rp.get({
      url: `${this.url}/${tableName}/count`,
      headers: {'X-Token': this.token || token},
      qs: {
        params: JSON.stringify(params)
      },
      json: true
    }).catch(parseError);
  }
  detail({tableName, token, selector} = {}) {
    return rp.get({
      url: `${this.url}/${tableName}/detail`,
      headers: {'X-Token': this.token || token},
      qs: getQS(selector),
      json: true
    }).catch(parseError);
  }
  aggregate({tableName, token, params, group, sort} = {}) {
    return rp.get({
      url: `${this.url}/${tableName}/aggregate`,
      headers: {'X-Token': this.token || token},
      qs: {
        params: JSON.stringify(params),
        group: JSON.stringify(group),
        sort: JSON.stringify(sort)
      },
      json: true
    }).catch(parseError);
  }
  add({tableName, token, data} = {}) {
    return rp.post({
      url: `${this.url}/${tableName}`,
      headers: {'X-Token': this.token || token},
      body: data,
      json: true
    }).catch(parseError);
  }
  edit({tableName, token, params, data} = {}) {
    return rp.patch({
      url: `${this.url}/${tableName}`,
      headers: {
        'X-Token': this.token || token,
        'Content-Type': 'application/json'
      },
      qs: {
        params: JSON.stringify(params)
      },
      body: data,
      json: true
    }).catch(parseError);
  }
  delete({tableName, token, params} = {}) {
    return rp.delete({
      url: `${this.url}/${tableName}`,
      headers: {
        'X-Token': this.token || token,
        'Content-Type': 'application/json'
      },
      qs: {
        params: JSON.stringify(params)
      },
      json: true
    }).catch(parseError);
  }
};

export default ClannadSDK;
