import React from 'react';
import { Button, Typography, TextField, CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import './PageNewGame.scss';
// import { Link } from 'react-router-dom';
// import { getUser } from './../../lib/UserData';
import { getUser } from './../../lib/userData/manager';

class PageNewGame extends React.Component {
  state = {
    nbPlayer: 1,
    progressSize: 0,
    connecting: false,
    redirect: false,
    gameName: "",
    gameDescription: "",
  }
  
  handleChange = name => event => {
    switch (name) {
      case 'nbPlayer':
        if(event.target.value > 0){
          this.setState({[name]: event.target.value});
        }
        break;
      default:
        this.setState({
          [name]: event.target.value,
        });
    }
  };

  connect = () => {
    this.setState({ connecting: true });
    this.setState({ progressSize: 30 });
    getUser().createGame(this.state.gameName, this.state.gameDescription, this.state.nbPlayer, (err) => {
      if (err) {
        this.setState({ progressSize: 0 });
        this.setState({ connectionErr: true });
        this.setState({ connecting: false });
        console.log(err);
      }
      else {
        this.setState({ redirect: true });
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.connect();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/connected/player-games' />
    }
    return (
      <div className='pageNewGame'>
        <Typography variant='h4' align='center'>
          Créer une partie
        </Typography>

        <form className='pageNewGame__form' onSubmit={this.handleSubmit}>
          <TextField
            disabled={this.state.connecting}
            className='pageNewGame__form__input'
            margin='normal'
            required
            variant='outlined'
            label='Nom de partie'
            value={this.state.gameName} onChange={this.handleChange('gameName')}
          />

          <TextField
            disabled={this.state.connecting}
            className='pageNewGame__form__input'
            margin='normal'
            required
            variant='outlined'
            label='Nombre de joueurs'
            type='number'
            value={this.state.nbPlayer}
            onChange={this.handleChange("nbPlayer")}
          />

          <TextField
            disabled={this.state.connecting}
            margin='normal'
            variant='outlined'
            label='Description'
            multiline
            rows="5"
            value={this.state.gameDescription} onChange={this.handleChange('gameDescription')}
          />
          {/* <Button component={Link} to='/connected/game' type='submit' variant="contained" color="inherit">Test</Button> */}
          <Button type='submit' variant="contained" color="primary" disabled={this.state.connecting}>C'est parti(e) !</Button>
          {/* <Button variant="contained" color="primary" component={Link} to="/connected/game">Test</Button> */}
          <CircularProgress size={this.state.progressSize} className='test' />
        </form>
      </div>
    );
  }
}

export default PageNewGame;
