import React from 'react';
import { Typography, Paper, Button, CircularProgress } from '@material-ui/core';
import InvitationPaper from './../../components/InvitationPaper/InvitationPaper';
import './InvitationPage.scss';
import { getUser } from './../../lib/userData/manager';

class InvitationPage extends React.Component {
  state = {
    invitations: [],
    isEnable: false,
    progressSize: 0,
  }

  constructor() {
    super();
    // TODO BDD
    this.state.invitations = getUser().invitationGames;
    // this.state.invitations.push({ _id: '1', gameName: 'La forge perdue', GMName: 'bidule', description: 'blablabla...' }, { _id: '2', gameName: 'La clef dorée', GMName: 'truc', description: 'pshtpshtpsht...' });
  }

  updateGames = () => {
    getUser().loadGames((err) => {
      if (err) return console.log(err);
      this.setState({invitations: getUser().invitationGames});
    });
  }

  invitationList() {
    if (this.state.invitations.length === 0) {
      return(
        <Paper className='invitation-page__paper--empty'>
          <Typography variant='h5' align='center'>Vous n'avez pas reçu d'invitation.</Typography>
        </Paper>
      );
    }

    return (
      this.state.invitations.map(elt => (
        <div className='invitation-page__paper' key={elt.id} id={elt.id}>
          <InvitationPaper idGame={elt.id} gameName={elt.name} GMName={elt.gameMaster} descriptionGame={elt.description} gameObject={elt} parent={this}/>
        </div>
      ))
    );
  }

  refresh = () => {
    // affiche loader
    this.setState({isEnable: true, progressSize: 30});
    getUser().loadGames((err)=>{
      if(err) return console.log(err);
      this.setState({invitations: getUser().invitationGames});
      // enleve loader
      this.setState({isEnable: false, progressSize: 0});
    });
  }

  render() {
    return (
      <div className='invitation-page'>
        <div className='invitation-page__refresh'>
          <Button onClick={this.refresh} disabled={this.state.isEnable}>Rafraichir</Button>
          <CircularProgress size={this.state.progressSize} />
        </div>
        <Typography variant='h4' align='center'>Invitations</Typography>

        {
          this.invitationList()
        }
      </div>
    );
  }
}

export default InvitationPage;