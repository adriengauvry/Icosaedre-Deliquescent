//Importation des éléments pour React.
import { Button, Card, Snackbar, TextField, Typography, CircularProgress, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './CardRegistration.scss';

import { register } from '../../lib/userData/manager';

class Registration extends Component {
  state = {
    progressSize: 0,
    disabled: false,
    username: "",
    password: "",
    passwordVerif: "",
    redirect: false,
    usernameErr: false,
    passwordErr: false
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // handleChangeCheckbox = name => event => {
  //   this.setState({
  //     [name]: event.target.checked,
  //   });
  // };

  createAccount = () => {
    if (this.state.username === "" || this.state.password === "" || this.state.passwordVerif === "") {
      this.setState({ usernameErr: this.state.username === "" });
      this.setState({ passwordErr: this.state.password === "" });
      this.setState({ passwordVerifErr: this.state.passwordVerif === "" });
      return;
    }
    if (this.state.password !== this.state.passwordVerif) {
      this.setState({ passwordVerifErr: this.state.password !== this.state.passwordVerif });
      this.setState({ passwordErr: this.state.password !== this.state.passwordVerif });
      this.setState({progressSize: 0, disabled: false});
      return;
    }
    
    //login(this.state.username, this.state.password);
    register(this.state.username, this.state.password, (res) => {
      this.setState({progressSize: 0, disabled: false});
      if (res) return alert(res.message);
      this.setState({ redirect: true });
      // if (res) {
      //   this.setState({ redirect: true });
      //   alert('erreur pseudo déjà utilisé');
      //   // alert('Compte créé');
      // }
    })
  }

  handleClose = () => {
    this.setState({passwordVerifErr: false});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({progressSize: 30, disabled: true});
    this.createAccount();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <Card className='cardInscript'>
        <Typography variant='h5' className='RegistrationTitle'>
          Inscription
        </Typography>
        <form className='formRegistration' onSubmit={this.handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            disabled={this.state.disabled}
            variant='outlined'
            label='Pseudo'
            value={this.state.username} onChange={this.handleChange('username')} error={this.state.usernameErr}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            disabled={this.state.disabled}
            variant='outlined'
            label='Mot de passe'
            type='password'
            error={this.state.passwordVerifErr} value={this.state.password} onChange={this.handleChange('password')}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            disabled={this.state.disabled}
            variant='outlined'
            label='Ressaisir mot de passe'
            type='password'
            error={this.state.passwordVerifErr} value={this.state.passwordVerif} onChange={this.handleChange('passwordVerif')}
          />
          {/* <FormControlLabel className="checkboxMJ"
            control={
              <Checkbox
                checked={this.state.isGM}
                onChange={this.handleChangeCheckbox('isGM')}
                color="primary"
              />
            }
            label="Je suis un Game Master!"
          /> */}

          <Button type='submit' fullWidth variant="contained" disabled={this.state.disabled} color="primary">Valider</Button>
          <CircularProgress size={this.state.progressSize} />
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            color='inherit'
            onClose={this.handleClose}
            open={this.state.passwordVerifErr}
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
            autoHideDuration={3000}
            message={
              <span>
                Les 2 mots de passe ne concordent pas.
              </span>
            }
          />
        </form>
        <Button disabled={this.state.disabled} component={Link} to='/'>Retourner à la connexion</Button>
      </Card>
    );
  }
}

export default Registration;
