const request = require('superagent');
const moment = require('moment');

const config = require('../config');
const log = require('./log');

const mixIn = require('mout/object/mixIn');

const HOST = config.keycloakHost;
const BASE_URL = HOST + '/auth/admin';
const TOKEN_URL = HOST + '/auth/realms/master/protocol/openid-connect/token';

function getAuth(username, password) {
  // TODO Use refresh token and stuff
  return request.post(TOKEN_URL)
    .type('form')
    .send({
      username: config.keycloakAuth.username,
      password: config.keycloakAuth.password,
      grant_type: 'password',
      client_id: 'admin-cli'
    })
    .then(res => res.body.access_token, log.error)
}

function getAllRealms() {
  const url = BASE_URL + `/realms`;

  return getAuth()
          .then(access_token => request.get(url).set('Authorization', `Bearer ${access_token}`))
          .then(res => res.body.map(r => r.realm), log.error)
}

function getRealmClients(realm) {
  const url = BASE_URL + `/realms/${realm}/client-session-stats`;

  return getAuth().then(access_token => request.get(url).set('Authorization', `Bearer ${access_token}`))
          .then(res => res.body.map(c => c.id), log.error)
}

function getClientDetails(realm, client) {
  const url = BASE_URL + `/realms/${realm}/clients/${client}/user-sessions`;

  return getAuth()
          .then(access_token => request.get(url).set('Authorization', `Bearer ${access_token}`))
          .then(res => res.body);
}

function getAllActiveUsers(callback) {

  getAllRealms().then(realms => {
    const realmClientsReady = realms.map(realm => {
      return new Promise(resolve => {
        getRealmClients(realm).then(clients => {
          const obj = {};
          obj[realm] = clients.length;
          resolve(obj);
        });
      })
    });

    return Promise.all(realmClientsReady).then(realmClients =>
      callback(null, mixIn.apply(null, realmClients)))
  })
  .catch(err => {
    log.error(err);
    callback(err);
  });

}

exports.getAllActiveUsers = getAllActiveUsers;