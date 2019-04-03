import User from './user';
import request from 'request';
import Cookie from "js-cookie";

const API_PATH = 'https://ico-dqct-api.herokuapp.com';

let user;

/**
 * Return the current user.
 * @returns {User} The current user.
 */
function getUser() { return user }

function getToken() { return Cookie.get('token') }

function setToken(value) { Cookie.set('token', value) }

function removeToken() { Cookie.remove('token') }

/**
 * Create an account.
 * @param {String} username 
 * @param {String} password 
 * @param {Boolean} isGM 
 * @param {function(any):void} callback 
 */
function register(username, password, callback) {
  request.post(`${API_PATH}/users`, (err, res, body) => {
    if (err) return callback(err);
    if (res.statusCode !== 200) return callback(body);
    callback();
  }).json({ username: username, password: password, isGM: true });
}

/**
 * Login a user.
 * @param {String} username
 * @param {String} password 
 * @param {function(any):void} callback 
 */
function login(username, password, callback) {
  request.get(`${API_PATH}/users/login`, (err, res, body) => {
    if (err) return callback(err);
    if (res.statusCode !== 200) return callback(JSON.parse(body));
    let obj = JSON.parse(body);
    setToken(obj.token);
    user = new User(obj.username);
    user.loadData(callback);
  }).auth(username, password);
}

/**
 * Login a user with the token in cookies if it exists.
 * @param {function(any):void} callback 
 */
function autoLogin(callback) {
  if (!getToken()) return callback('no token');
  request.get(`${API_PATH}/users/login`, (err, res, body) => {
    if (err || res.statusCode !== 200) removeToken();
    if (err) return callback(err);
    if (res.statusCode !== 200) return callback(JSON.parse(res.body));
    let obj = JSON.parse(body);
    setToken(obj.token);
    user = new User(obj.username);
    user.loadData(callback)
  }).auth(null, null, true, getToken());
}

/**
 * Logout the current user.
 */
function logout() {
  user = undefined;
  removeToken();
}

function searchUser(username, nbOfUser, callback) {
  request.get(`${API_PATH}/users/search?filter=${username}&limit=${nbOfUser}`, (err, res, body) => {
    if (err) return callback(err);
    if (res.statusCode !== 200) return callback(JSON.parse(body));
    let obj = JSON.parse(body);
    callback(obj.username);
  });
}

export { API_PATH, register, login, autoLogin, logout, getUser, searchUser }
