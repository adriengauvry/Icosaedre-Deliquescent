import Peer from 'peerjs';

class PeerClient {
  _roomName;
  _username;
  _playersNames;

  _id;
  _peer;
  get _connections() {
    let conns = [];
    let entries = Object.entries(this._peer.connections);
    for(const entrie of entries) {
      for(const conn of entrie[1]) conns.push(conn);
    }
    return conns;
  }

  _playerData;
  set playerData(val) {
    console.log("updating Player");
    this._playerData = { type:'PLAYER', peerId: this._id, username: this._username, playerData: val }
    this._sendPlayerData();
  }
  _onPlayersDataListener;

  _gameData;
  set gameData(val) {
    console.log("updating game");
    this._gameData = { type: 'GAME', gameData: val }
    this._sendGameData();
  }
  _onGameDataListener;

  constructor(username, gameId, peersNames) {
    this._username = username;
    this._roomName = gameId;
    this._playersNames = peersNames;
    this._id = this._roomName + '-' + this._username;
    this._start();
  }

  _start() {
    this._peer = Peer(this._id, { host: 'ico-dqct.herokuapp.com', port: 80, path: '/p2p' });

    this._peer.on('open', (id) => {
      console.log('connected to peer-server as ' + id);
      this._connectToAllPlayers();
    });

    this._peer.on('disconnected', () => {
      console.log('disconnected from peer-server. Reconnecting...');
      this._start();
    });

    this._peer.on('connection', (conn) => {
      conn.on('data', this._onData);
      conn.on('open', () => {
        conn.send(JSON.stringify(this._playerData));
      });
    });

    this._peer.on('error', this._onerror);
  }

  _connectToAllPlayers() {
    for (const player of this._playersNames) {
      this._peer.connect(`${this._roomName}-${player}`);
    }
  }

  _sendPlayerData() {
    for (const conn of this._connections) {
      if(!conn.open) continue;
      conn.send(JSON.stringify(this._playerData));
    }
  }
  
  _sendGameData() {
    console.log(this._gameData);
    for (const conn of this._connections) {
      if(!conn.open) continue;
      conn.send(JSON.stringify(this._gameData));
    }
  }

  _onData(data) {
    var parsedData = JSON.parse(data);
    console.log(parsedData);
    if (parsedData.type === 'PLAYER' && this._onPlayersDataListener) this._onPlayersDataListener(parsedData);
    if (parsedData.type === 'GAME' && this._onGameDataListener) this._onGameDataListener(parsedData);
  }

  setOnPlayersDataListener(callback) {
    this._onPlayersDataListener = callback;
  }

  setOnGameDataListener(callback) {
    this._onGameDataListener = callback;
  }

  _onerror(err) {
    if(err.toString().includes("Could not connect to peer ")) return;
    if(err.toString().includes("Lost connection to server.")) return;
    console.log(err);
  }

}

export default PeerClient;
