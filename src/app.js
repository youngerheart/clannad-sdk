import rp from 'request-promise';

const parseError = (err) => {
  throw err.error;
};

class ClannadSDK {
  constructor(config) {
    var {host, project, token} = config;
    this.url = `${host || '127.0.0.1'}/${project || 'test'}`;
    this.token = token || '';
  }
  list(tableName, seletor, query = {}) {
    var {offset, limit, populate, sort, asc} = seletor;
    offset = offset || 0;
    limit = limit || 30;
    sort = sort || 'updateAt';
    asc = asc || '';
    populate = populate.join();
    return rp.get({
      url: `${this.url}/${tableName}`,
      qs: {offset, limit, sort, asc, populate, ...query},
      headers: {
        'X-Token': this.token
      },
      json: true
    }).catch(parseError);
  }
  count(tableName, query = {}) {
    return rp.get({
      url: `${this.url}/${tableName}/count`,
      qs: {...query},
      headers: {
        'X-Token': this.token
      },
      json: true
    }).catch(parseError);
  }
  detail(tableName, id) {
    return rp.get({
      url: `${this.url}/${tableName}/${id}`,
      headers: {
        'X-Token': this.token
      },
      json: true
    }).catch(parseError);
  }
  add(tableName, params) {
    return rp.post({
      url: `${this.url}/${tableName}`,
      body: params,
      headers: {
        'X-Token': this.token
      },
      json: true
    }).catch(parseError);
  }
  edit(tableName, id, params) {
    return rp.patch({
      url: `${this.url}/${tableName}/${id}`,
      body: params,
      headers: {
        'X-Token': this.token
      },
      json: true
    }).catch(parseError);
  }
  delete(tableName, id) {
    return rp.delete({
      url: `${this.url}/${tableName}/${id}`,
      headers: {
        'X-Token': this.token
      },
      json: true
    }).catch(parseError);
  }
};

export default ClannadSDK;
