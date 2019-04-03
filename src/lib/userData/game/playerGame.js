import request from 'request';
import { API_PATH } from '../manager';

import PlayableGame from './playableGame';

class PlayerGame extends PlayableGame {

  /**
   * Quit the game.
   * @param {function(any):void} callback 
   */
  quit(callback) {//TODO: Test this.
    request.put(`${API_PATH}/games/${this.id}/player-quit`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(JSON.parse(body));
      this._user.loadGames(callback);
    }).auth(null, null, true, this.token);
  }
}

export default PlayerGame; 
