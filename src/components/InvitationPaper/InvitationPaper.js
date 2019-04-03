import React from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { getUser } from './../../lib/userData/manager';
import './InvitationPaper.scss';

class InvitationPaper extends React.Component {
  state = {
    gameObject: null,
    idGame: '',
    gameName: '',
    GMName: '',
    descriptionGame: '',
    open: false,
  }

  parent = undefined;

  invitationRefused = event => {
    this.setState({ open: true });
  }

  invitationAccepted = event => {
    this.state.gameObject.acceptInvitation((err) => {
      if (err) return console.log(err);
      getUser().loadGames((err2)=>{
        if(err2) return console.log(err2);
        this.parent.setState({ invitations: getUser().invitationGames });
      });
      this.parent.updateGames();
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.setState({ open: false });
    console.log('Invitation refusé : ' + this.state.idGame);
    this.state.gameObject.declineInvitation((err) => {
      if (err) return console.log(err);
      this.parent.updateGames();
    });
  };

  constructor(props) {
    super();
    // idGame, gameName, GMName, descriptionGame
    this.state.idGame = props.idGame;
    this.state.gameName = props.gameName;
    this.state.GMName = props.GMName;
    this.state.descriptionGame = props.descriptionGame;
    this.state.gameObject = props.gameObject;
    this.parent = props.parent;
  }

  render() {
    return (
      <Paper id={this.state.idGame} className='invitation-paper'>
        <div className='invitation-paper__title'>
          <Typography variant='h5'>{this.state.gameName}</Typography>
          <Typography variant='h6'>{this.state.GMName}</Typography>
        </div>
        <Typography>{this.state.descriptionGame}</Typography>
        <div className='invitation-paper__buttons'>
          <Button size='small' color='primary' onClick={this.invitationRefused} >Refuser</Button>
          <Button size='small' color='primary' variant='contained' onClick={this.invitationAccepted} >Accepter</Button>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Refuser l'invitation ?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous supprimer l'invitation ?
              Cette action est irréversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

export default InvitationPaper;