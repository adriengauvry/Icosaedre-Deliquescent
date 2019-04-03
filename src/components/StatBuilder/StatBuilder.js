import React from 'react';

import { List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, TextField, Button, Snackbar } from '@material-ui/core';
import { Delete, Close } from '@material-ui/icons';
import { getUser } from './../../lib/userData/manager';
import './StatBuilder.scss';

class StatBuilder extends React.Component {
  currentGame = undefined;
  stats = [];
  state = {
    newStat: '',
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    enabled: true,
  };

  constructor(props){
    super();
    this.currentGame = getUser().currentGame;
    this.stats = props.stats;
  }

  getStats = () => {
    return this.stats;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSumbit = (event) => {
    event.preventDefault();
    if (this.state.newStat.trim() === '') {
      this.setState({
        open: true,
        message: 'Chaine invalide',
      });
      this.becomeEmpty();
      return;
    }
    if(this.stats.indexOf(this.state.newStat) === -1) {
      this.stats.push(this.state.newStat);
      this.currentGame.players.forEach(player => {
        // console.log(player);
        player.stats.push({name: this.state.newStat, currently: 0, max: 0});
      });
    }
    else {
      this.setState({
        open: true,
        message: 'Stat déjà présente dans le tableau',
      });
    }
    this.becomeEmpty();
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleDelete = name => event => {
    this.stats.splice(this.stats.indexOf(name), 1);
    this.currentGame.players.forEach(player => {
      var deleteStat = player.stats.map(stat => {
        if(stat.name === name){
          return stat;
        }
        return undefined;
      });
      player.stats.splice(player.stats.indexOf(deleteStat), 1);
    });
    this.forceUpdate();
  }

  becomeEmpty = () => {
    this.setState({
      newStat: '',
    });
  }

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div className='builder'>
        <form className='builder__form' onSubmit={this.handleSumbit}>
          <TextField
            className='builder__form__textfield'
            id="outlined-full-width"
            label="Nouvelle stat"
            margin="normal"
            variant="outlined"
            value={this.state.newStat}
            onChange={this.handleChange('newStat')}
            required
            fullWidth
          />
          <Button className='builder__form__button' type="sumbit" variant="contained" color="primary">Valider</Button>
        </form>

        <List id="listStat">
          {
            this.stats.map(stat => (
              <ListItem divider={true} key={stat}>
                <ListItemText
                  primary={stat}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={this.handleDelete(stat)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={this.state.message}
          action={
            <IconButton
              color="inherit"
              onClick={this.handleClose}
            >
              <Close />
            </IconButton>
          }
        />
      </div>
    );
  }
}

export default StatBuilder;