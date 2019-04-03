import React from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, withMobileDialog } from '@material-ui/core';
import PlayerDetails from '../CardStats/PlayerDetails';
import gnome from '../../images/gnome.png';
import './PlayerPaper.scss'
// import './PlayerPaper.scss';

class PlayerPaper extends React.Component {
  currentGame = undefined;
  player = undefined;
  state = {
    playerName: '',
    open: false,
    playerImg: gnome,
    file: '',
  }

  constructor(props) {
    super();
    this.currentGame = props.game;
    this.player = props.player;
  }

  showDetails = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleImageChange(e) {

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        playerImg: reader.result
      }); console.log(this.state.playerImg.search(/^data:image\//g))
    }; console.log(this.state.playerImg);
    reader.readAsDataURL(file);
  }

  kickUser = () => {
    alert('Suppression à faire.');
  }

  render() {
    const { fullScreen } = this.props
    return (
      <div>
        <Paper id={this.state.idGame} className='player-paper'>
          <Typography variant='h5'>{this.player.username}</Typography>
          <Button size='small' color='primary' variant='contained' onClick={this.showDetails}>Details</Button>
          <Button size='small' color='primary' variant='outlined' onClick={this.kickUser}>Rejeter de la partie</Button>
        </Paper>

        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        fullScreen={fullScreen} >
        <DialogTitle>Stat de {this.player.username} <img alt="" className='charPic' src={this.state.playerImg}></img>
        <Button className="submitButton" variant="contained" component="label">
            Choisir Image
            <input
              className="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={e => this.handleImageChange(e)}
            />
            </Button>
        </DialogTitle>

          <DialogContent>
            <PlayerDetails player={this.player} game={this.currentGame}/>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>Fermer</Button>
          </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(PlayerPaper);