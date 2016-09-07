import CS from '../src/index';

const cs = new CS({
  host: 'http://127.0.0.1:3000',
  projectName: 'mdms'
});

cs.auth().then((res) => {
  console.log(res);
});

cs.list({
  tableName: 'user',
  selector: {
    populate: {path: 'productLine'}
  }
}).then((res) => {
  console.log(res);
});

cs.count({
  tableName: 'user'
}).then((res) => {
  console.log(res);
});

cs.detail({
  tableName: 'user'
}).then((res) => {
  console.log(res);
});

cs.add({
  tableName: 'user',
  data: {}
}).catch((err) => {
  console.log(err);
});

cs.edit({
  tableName: 'user',
  params: {workCode: 'E000567'},
  data: {mobile: '123'}
}).catch((err) => {
  console.log(err);
});

cs.delete({
  tableName: 'user',
  params: {workCode: 'E000568'}
}).catch((err) => {
  console.log(err);
});
