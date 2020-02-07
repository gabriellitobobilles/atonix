const users = {
  username: 'gbobilles@fullscale.io',
  atonixQAuser: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
};

const passWord = {

  stage: '$TxE8xf8',
  test: 'Z10jk%XG,C',
  atonixQApassword: 'Passw0rd1!',
};

const baseUrl = {
  test: 'https://siitest.asset360.com/asset360',
  stage: 'https://stage.asset360.com/Asset360',

};
const serverToTest = baseUrl.stage;
const username = users.username;
const password = passWord.stage;

export {

  username,
  password,
  baseUrl,
  serverToTest,
  users,

};
