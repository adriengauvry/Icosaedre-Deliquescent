//Importation des éléments pour React.
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './CardConnection.scss';

import { login, autoLogin } from '../../lib/userData/manager';


import { Button, Card, Typography, TextField, Snackbar, IconButton, CircularProgress } from '@material-ui/core';

import { Close } from '@material-ui/icons';

class Connection extends Component {
  state = {
    open: false,
    progressSize: 0,
    username: "",
    password: "",
    redirect: false,
    connecting: false,
    connectionErr: false,
  }

  componentDidMount() {
    this.autoConnect();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({ connectionErr: false });
  };

  autoConnect = () => {
    this.setState({ connecting: true });
    this.setState({ progressSize: 30 });
    autoLogin((err)=> {
      if (err) {
        this.setState({ progressSize: 0 });
        this.setState({ connecting: false });
      }
      else {
        this.setState({ redirect: true });
      }
    });
  }

  connect = () => {
    this.setState({ connecting: true });
    this.setState({ progressSize: 30 });
    login(this.state.username, this.state.password, (err) => {
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
      return <Redirect to='/connected' />
    }
    return (
      <Card className='cardConnection'>
        <Typography variant='h5' className='connectionTitle'>
          Connexion
        </Typography>
        <form className='formConnection' onSubmit={this.handleSubmit}>
          <TextField
            disabled={this.state.connecting}
            margin='normal'
            required
            fullWidth
            variant='outlined'
            label='Pseudo'
            value={this.state.username} onChange={this.handleChange('username')}
          />
          <TextField
            disabled={this.state.connecting}
            margin='normal'
            required
            fullWidth
            variant='outlined'
            label='Mot de passe'
            type='password'
            value={this.state.password} onChange={this.handleChange('password')}
          />
          <Button type='submit' fullWidth variant="contained" color="primary" disabled={this.state.connecting}>Connexion</Button>
        </form>

        <Button onClick={this.handleClick} component={Link} to="/create-account">Créer un compte</Button>
        <CircularProgress size={this.state.progressSize} className='test' />


        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.connectionErr}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={
            <span>
              Pseudo ou mot de passe déliquescents.
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <Close />
            </IconButton>
          ]}
        />
      </Card>
    );
  }
}

export default Connection;
