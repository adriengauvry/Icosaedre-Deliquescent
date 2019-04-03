import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, withMobileDialog, DialogActions } from '@material-ui/core';
import { getUser } from './../../lib/userData/manager';
import StatBuilder from './../StatBuilder/StatBuilder';
import PlayerPaper from './../PlayerPaper/PlayerPaper';
import PlayerDetails from './PlayerDetails';
import './CardStats.scss';

class CardStats extends Component {
  currentGame = undefined;
  stats = []
  players = []
  player = undefined;
  state = {
    openStatBase: false,
    openStatPlayer: false,
    nameStat: "",
    namePerso: "",
    actual: 0,
    max: 0,
  };

  constructor() {
    super();
    this.currentGame = getUser().currentGame;
    console.log(this.currentGame.players);
    this.stats = ['COU', 'FOR', 'INT'];
    // CHANGE: don't push
    this.players.push({name: 'Mario',
                          stats: [{name: 'COU', currently: 10, max: 10},
                                  {name: 'FOR', currently: 12, max: 12},
                                  {name: 'INT', currently: 8, max: 8}
                                ]},
                      {name: 'Luigi',
                          stats: [{name: 'COU', currently: 5, max: 5},
                                  {name: 'FOR', currently: 10, max: 10},
                                  {name: 'INT', currently: 11, max: 11}
                                ]});
  }

  handleClickOpen = () => {
    this.setState({ openStatBase: true });
  };

  saveGame = () => {
    alert('Save à faire');
  }

  // handleCreate = () => {
  //   let player = {};
  //   player.name = this.state.namePerso;
  //   player.stats = [];
  //   this.stats.forEach(stat => {
  //     player.stats.push({name: stat, currently: 0, max: 0});
  //   });
  //   this.players.push(player);
  //   this.handleClose();
  // }

  handleClose = () => {
    this.setState({ openStatPlayer: false, openStatBase: false });
  };

  displayIfGM(param) {
    switch (param) {
      case 'gestionStat':
        if (getUser().username === this.currentGame.gameMaster) {
          return (
            <div className='page__container__gestion'>
              <Button color='primary' variant='contained' onClick={this.handleClickOpen}>Gestion des statistiques</Button>
              <Button color='primary' variant='contained' onClick={this.saveGame}>Sauvegarder la partie</Button>
            </div>
          );
        }
        break;
      case 'playerList':
        if(getUser().username === this.currentGame.gameMaster){
          return this.playerList()
        }
        else{
          return this.playerDetails()
        }
      default:
        return null;
    }
  }

  playerDetails() {
    // CHANGE: select the good player with getUser().username
    this.currentGame.players.forEach(player => {
      if(player.username === getUser().username){
        this.player = player;
      }
    });
    return(
      <PlayerDetails game={this.currentGame} player={this.player} playerStats={this.players[1].stats}/>
    );
  }

  playerList(){
    // CHANGES: delete this iterator
    if(this.currentGame.players[0].stats === undefined){
      this.currentGame.players.forEach(element => {
        element.stats = [];
      });
    }
    return(
      // CHANGE: this.currentGame
      this.currentGame.players.map(player => (
        // CHANGE: player.username by player.charaname
        <PlayerPaper key={player.username} game={this.currentGame} player={player} />
      ))
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <div className='page'>

        <div className='page__container'>
          {
            this.displayIfGM('gestionStat')
          }

          {
            this.displayIfGM('playerList')
          }
        </div>

        <Dialog
          open={this.state.openStatBase}
          onClose={this.handleClose}
          fullScreen={fullScreen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Stats de la partie</DialogTitle>
          <DialogContent>
            <StatBuilder stats={this.currentGame.stats}/>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>Fermer</Button>
          </DialogActions>
        </Dialog>

        {/* <Dialog
          open={this.state.openCreatePlayer}
          onClose={this.handleClose}
          fullScreen={fullScreen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Créer un nouveau perso</DialogTitle>
          <DialogContent>
          <TextField
            label="Nom"
            margin="normal"
            variant="outlined"
            value={this.state.namePerso}
            onChange={this.handleChange('namePerso')}
            required
            fullWidth
          />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>Fermer</Button>
            <Button color="primary" variant='contained' onClick={this.handleCreate}>Valider</Button>
          </DialogActions>
        </Dialog> */}

      </div>
    );
  }
}

export default withMobileDialog()(CardStats);