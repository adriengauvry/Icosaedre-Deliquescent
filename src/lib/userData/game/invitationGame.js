import request from 'request';
import { API_PATH } from '../manager';

import Game from './game';
// import { request } from 'http';

class InvitationGame extends Game {

  /**
   * Accept the invitation.
   * @param {function(any):void} callback 
   */
  acceptInvitation(callback) {
    request.put(`${API_PATH}/games/${this.id}/accept-invitation`, (err, res, body) => {
      if(err) return callback(err);
      if(res.statusCode !== 200) return callback(JSON.parse(body));
      this._user.loadGames(callback);
    }).auth(null, null, true, this.token);
  }

  /**
   * Decline the invitation.
   * @param {function(any):void} callback 
   */
  declineInvitation(callback) {
    request.put(`${API_PATH}/games/${this.id}/decline-invitation`, (err, res, body) => {
      if(err) return callback(err);
      if(res.statusCode !== 200) return callback(JSON.parse(body));
      this._user.loadGames(callback);
    }).auth(null, null, true, this.token);
  }

}

export default InvitationGame;
