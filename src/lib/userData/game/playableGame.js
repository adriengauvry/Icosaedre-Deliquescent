import request from 'request';
import { API_PATH } from '../manager';
import PeerClient from '../peer-to-peer/peerClient';

import Game from './game';

class PlayableGame extends Game {
  players;
  stats;
  currentMap;
  _peerClient;
  _gameUpdateListener;

  constructor(id, name, gameMaster, description, maxPlayers, invitedUsers, stats, currentMap, players) {
    super(id, name, gameMaster, description, maxPlayers, invitedUsers);
    this.stats = stats;
    this.currentMap = currentMap;
    this.players = players;
  }

  /**
   * Set the listener called when game is updated by peers
   * @param {function():void} callback 
   */
  setOnGameUpdateListener(callback) {
    this._gameUpdateListener = callback;
  }

  /**
   * Send the game's data to all peers
   */
  updateGameToPeers() {
    if (this._peerClient) {
      let gameData = {};
      let gameEntries = Object.entries(this);
      for (const entry of gameEntries) {
        if (entry[0].charAt(0) === '_') continue;
        gameData[entry[0]] = entry[1];
      }
      this._peerClient.gameData = gameData;
    }
  }

  /**
   * Send the current user's data to all peers
   */
  updatePlayerToPeers() {
    if (this._peerClient)
      this._peerClient.playerData = this.players[this.players.findIndex(p => p.username === this._user.username)];
  }

  /**
   * Load the game's details.
   * @param {function(any):void} callback 
   */
  loadDetails(callback) {//TODO: Test this
    request.get(`${API_PATH}/games/${this.id}`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(JSON.parse(body));
      console.log(body);
      callback();
    }).auth(null, null, true, this.token);
  }

  /**
   * Start the peer client
   */
  start() {
    var peersNames = this.players.map(player => player.username);
    peersNames.push(this.gameMaster);
    peersNames.splice(peersNames.findIndex(el => el === this._user.username), 1);
    this._peerClient = new PeerClient(this._user.username, this.id, peersNames);
    this.updateGameToPeers();
    this.updatePlayerToPeers();
    this._peerClient.setOnPlayersDataListener(this._onPlayerData);
    this._peerClient.setOnGameDataListener(this._onGameData);
  }

  _onPlayerData(data) {
    console.log(`Updating player ${data.username}`);
    let playerIndex = this.players.findIndex((el) => { return el.username === data.username });
    this.players[playerIndex] = data.playerData;
    if (this._gameUpdateListener) this._gameUpdateListener();
  }

  _onGameData(data) {
    var dataEntries = Object.entries(data.gameData);
    for (const entry of dataEntries) {
      this[entry[0]] = entry[1];
    }
    if (this._gameUpdateListener) this._gameUpdateListener();
  }

  /**
   * Stop the peer client
   */
  stop() {
    this._peerClient = undefined;
  }
}

export default PlayableGame; 
