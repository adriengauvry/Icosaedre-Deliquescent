import request from 'request';
import { API_PATH } from '../manager';

import PlayableGame from './playableGame';

class GameMasterGame extends PlayableGame {

  /**
   * Save all changes made to the game.
   * @param {function(any):void} callback 
   */
  save(callback) {//TODO: Test this
    let gameToSave = {}
    let gameEntries = Object.entries(this);
    for (const entry of gameEntries) {
      if (entry[0].charAt(0) === '_') continue;
      gameToSave[entry[0]] = entry[1];
    }
    request.put(`${API_PATH}/games/${this.id}`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(JSON.parse(body));
      callback();
    }).json(gameToSave)
      .auth(null, null, true, this.token);
  }

  /**
   * Delete the game.
   * @param {function(any):void} callback 
   */
  delete(callback) {
    request.delete(`${API_PATH}/games/${this.id}`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(JSON.parse(body));
      this._user.loadGames(callback);
    }).auth(null, null, true, this.token);
  }

  /**
   * Invite a player to the game.
   * @param {String} username 
   * @param {function(any):void} callback 
   */
  inviteUser(username, callback) {
    request.post(`${API_PATH}/games/${this.id}/${username}`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(body);
      callback();
    }).auth(null, null, true, this.token);
  }

  /**
   * Kick a user from the game.
   * @param {String} username 
   * @param {function(any):void} callback 
   */
  kickUser(username, callback) {//TODO: test this.
    request.put(`${API_PATH}/games/${this.id}/kick-player?user=${username}`, (err, res, body)=>{
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(body);
      callback();
    });
  }

}

export default GameMasterGame; 
