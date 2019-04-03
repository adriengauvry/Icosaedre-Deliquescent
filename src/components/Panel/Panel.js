import React from 'react';
import { Typography, Button, Paper, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import { getUser } from './../../lib/userData/manager';
import { searchUser } from './../../lib/userData/manager';
import { Link } from 'react-router-dom';
import './Panel.scss';

class Panel extends React.Component {
  gameObject = null;
  state = {
    id: '',
    gameName: '',
    description: '',
    player: '',
    checked: [],
    players: [],
    open: false,
    openWarning: false,
  };

  handleChange = (name, id) => event => {
    if (name === 'delete') {
      var node = document.getElementById(id);
      this.gameObject.delete((err) => {
        if (err) return console.log(err);
        getUser().loadGames((err) => {
          if (err) return console.log(err);
        });
      });
      node.remove();
      this.handleClose();
    }
    if (name === 'deleteCaution') this.setState({ openWarning: true });
  };

  handleChangeState = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    let player = document.getElementById('playerName');
    if (player.value.length > 0) {
      searchUser(player.value, 5, (usernames) => {
        this.setState({ players: usernames });
      })
      console.log(this.state.checked);
    }
    else {
      this.setState({ players: [] });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, checked: [], openWarning: false, player: '', players: [] });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.checked.length === 0) {
      alert('Aucun joueur selectionné');
      return;
    }
    this.state.checked.forEach(element => {
      this.gameObject.inviteUser(element, (err) => {
        if (err) return console.log(err);
      });
    });
    this.setState({ open: false, checked: [], player: '', players: [] });
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  loadGame = () => {
    getUser().currentGame = this.gameObject;
  }

  constructor(props) {
    super();
    this.state.id = props.id;
    this.state.gameName = props.gameName;
    this.state.description = props.description;
    this.gameObject = props.gameObject;
  }

  render() {
    return (
      <Paper className='page-list-game' id={this.state.id}>
        <Typography variant='h5'>{this.state.gameName}</Typography>
        <Typography>{this.state.description}</Typography>

        <div className='page-list-game__buttons'>
          <Button className="page-list-game__buttons__button" size="small" color="primary" onClick={this.handleChange('deleteCaution')}>
            Supprimer
          </Button>
          <Button className="page-list-game__buttons__button" size="small" variant='outlined' color="primary" onClick={this.handleClickOpen}>
            Inviter
          </Button>
          <Button className="page-list-game__buttons__button" component={Link} to='/connected/game' onClick={this.loadGame} size="small" variant='contained' color="primary">
            Jouer
          </Button>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose} >

          <DialogTitle>Inviter joueur</DialogTitle>

          <form className='page__form' id='test' onSubmit={this.handleSubmit}>
            <DialogContent>
              <List>
                {this.state.checked.map(value => (
                  <ListItem key={value} button>
                    <ListItemText primary={`${value}`} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        onChange={this.handleToggle(value)}
                        checked={this.state.checked.indexOf(value) !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <TextField
                id="playerName"
                label="Ajouter joueur"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={this.state.player} onChange={this.handleChangeState('player')}
              />

              <List>
                {this.state.players.map(value => (
                  <ListItem key={value} button>
                    <ListItemText primary={`${value}`} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        onChange={this.handleToggle(value)}
                        checked={this.state.checked.indexOf(value) !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleClose}>Fermer</Button>
              <Button type="submit" variant="contained" color="primary">Ajouter</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog
          open={this.state.openWarning}
          onClose={this.handleClose}
        >
          <DialogTitle>Supprimer la partie ?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous supprimer la partie ?
              Cette action est irréversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleChange('delete', this.state.id)} color="primary">
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

export default Panel;