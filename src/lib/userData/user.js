import request from 'request';
import Cookie from "js-cookie";
import { API_PATH } from './manager';
import Image from './image';
import InvitationGame from './game/invitationGame';
import GameMasterGame from './game/gameMasterGame';
import PlayerGame from './game/playerGame';

class User {
  _username;
  get username() { return this._username }

  _images;
  get images() { return this._images }

  _invitationGames;
  get invitationGames() { return this._invitationGames }

  _playerGames;
  get playerGames() { return this._playerGames }

  _gameMasterGames;
  get gameMasterGames() { return this._gameMasterGames }

  _currentGame;
  get currentGame() { return this._currentGame }
  set currentGame(val) { this._currentGame = val }

  constructor(username) {
    this._username = username;
  }

  get token() { return Cookie.get('token') }
  get isGM() { return true }

  /**
   * Load the user's data: images, games
   * @param {function(any):void} callback 
   */
  loadData(callback) {
    this.loadImages((err) => {
      if (err) return callback(err);
      this.loadGames(callback);
    });
  }

  /**
   * Load the user's details.
   * @param {function(any):void} callback 
   */
  loadDetails(callback) {
    request.get(`${API_PATH}/users/${this._username}`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(JSON.parse(body));
      callback();
    }).auth(null, null, true, this.token);
  }

  /**
   * Load the user's images
   * @param {function(any):void} callback 
   */
  loadImages(callback) {
    request.get(`${API_PATH}/images/by-user/${this._username}`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(JSON.parse(body));
      let obj = JSON.parse(body);
      let images = [];
      for (const img of obj.images) {
        let newImg = new Image(img._id, img.name, img.imgData, img.owner)
        newImg.user = this;
        images.push(newImg);
      }
      this._images = images;
      callback();
    }).auth(null, null, true, this.token);
  }

  /**
   * Upload an image with this user as owner.
   * @param {String} imgName The image's name
   * @param {String} imgData The image's data in base64
   * @param {function(any):void} callback 
   */
  uploadImage(imgName, imgData, callback) {
    request.post(`${API_PATH}/images`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(body);
      this.loadImages(callback);
    })
      .json({ name: imgName, imgData: imgData })
      .auth(null, null, true, this.token);
  }

  /**
   * Load all the user's games.
   * @param {function(any):void} callback 
   */
  loadGames(callback) {
    request.get(`${API_PATH}/games/by-user/${this._username}`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(body);
      let obj = JSON.parse(body);

      this._invitationGames = [];
      this._playerGames = [];
      this._gameMasterGames = [];
      for (const game of obj.games) {
        // console.log(game);
        if (game.gameMaster === this._username) {
          let newGame = new GameMasterGame(game._id, game.name, game.gameMaster, game.description, game.maxPlayers, game.invitedUsers, game.stats, game.currentMap, game.players);
          newGame.user = this;
          this._gameMasterGames.push(newGame);
        }
        else if (game.invitedUsers.includes(this._username)) {
          let newGame = new InvitationGame(game._id, game.name, game.gameMaster, game.description, game.maxPlayers, game.invitedUsers);
          newGame.user = this;
          this._invitationGames.push(newGame);
        } else {
          let newGame = new PlayerGame(game._id, game.name, game.gameMaster, game.description, game.maxPlayers, game.invitedUsers, game.stats, game.currentMap, game.players);
          newGame.user = this;
          this._playerGames.push(newGame);
        }
      }

      callback();
    }).auth(null, null, true, this.token);
  }

  /**
   * Create a game with this user as game master.
   * @param {String} name The game's name
   * @param {String} description The game's description
   * @param {String} maxPlayers The max number of player
   * @param {function(any):void} callback 
   */
  createGame(name, description, maxPlayers, callback) {
    request.post(`${API_PATH}/games`, (err, res, body) => {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(body);
      this.loadGames(callback);
    })
      .json({ name: name, description: description, maxPlayers: maxPlayers })
      .auth(null, null, true, this.token);
  }

}

export default User;
