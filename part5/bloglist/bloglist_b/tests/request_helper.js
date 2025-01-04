const URL = `My Endpoint`;
const TOKEN = 'Secret';

const hook = (method = 'post') => (args) =>
  supertest(URL)
    [method](args)
    .set('Authorization', `Bearer ${TOKEN}`);

const request = {
  post: hook('post'),
  get: hook('get'),
  put: hook('put'),
  delete: hook('delete'),
};

export default request;