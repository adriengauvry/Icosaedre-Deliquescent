import Cookie from "js-cookie";

class Game {
  _user;
  set user(val) { this._user = val }

  id;
  name;
  gameMaster;
  description;
  maxPlayers;
  invitedUsers;

  constructor(id, name, gameMaster, description, maxPlayers, invitedUsers) {
    this.id = id;
    this.name = name;
    this.gameMaster = gameMaster;
    this.description = description;
    this.maxPlayers = maxPlayers;
    this.invitedUsers = invitedUsers;
  }

  get token() { return Cookie.get('token') }
}

export default Game;
