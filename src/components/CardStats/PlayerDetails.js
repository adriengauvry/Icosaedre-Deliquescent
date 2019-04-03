import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogActions, DialogContent, TextField, withMobileDialog } from '@material-ui/core';

class PlayerDetails extends React.Component {
  // statsGame = [];
  statsPlayer = {};
  currentGame = undefined;
  player = undefined;
  state = {
    statName: undefined,
    currently: undefined,
    max: undefined,
    statToChange: undefined,
    openStatPlayer: false,
  };

  constructor(props) {
    super();
    this.currentGame = props.game;
    this.player = props.player;
    // CHANGE: wait debrit's work
    // console.log(props.playerName);
    // props.playerStats.forEach(stat =>{
    //   this.statsGame.push(stat.name)
    // });
    
    // props.playerStats.forEach(elt => {
    //   this.statsPlayer[elt.name] = { courant: elt.currently, max: elt.max };
    // });
    // console.log(this.statsPlayer);
  }

  handleClickModify = (stat) => event => {
    // CHANGE: modify player.stats
    this.setState({openStatPlayer: true, statToChange: stat, statName: stat.name, currently: stat.currently, max: stat.max});
  }

  handleClose = () => {
    this.setState({ openStatPlayer: false });
  };

  handleSumbit = event => {
    event.preventDefault();
    this.player.stats.forEach(stat => {
      if(stat.name === this.state.statName){
        stat.currently = this.state.currently;
        stat.max = this.state.max;
      }
    });
    this.setState({ openStatPlayer: false });
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom de la stat</TableCell>

            <TableCell align="right">Actuel</TableCell>
            <TableCell align="right">Max</TableCell>

            <TableCell align="right">Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id='table_body'>
          {
            this.player.stats.map(stat => (
              <TableRow key={stat.name + '_key'}>
                <TableCell>{stat.name}</TableCell>
                <TableCell>{stat.currently}</TableCell>
                <TableCell>{stat.max}</TableCell>
                <TableCell align='right'>
                  <Button onClick={this.handleClickModify(stat)}>Modifier</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Dialog
        open={this.state.openStatPlayer}
        onClose={this.handleClose}
        fullScreen={fullScreen} >
        <DialogTitle>Modifier la stat {this.state.nameStat}</DialogTitle>
        <form className='page__form' onSubmit={this.handleSumbit}>
          <DialogContent>
            <TextField
              className="page__form"
              label="Actuel"
              type="number"
              variant="outlined"
              margin="normal"
              required
              value={this.state.currently}
              onChange={e => this.setState({ currently: e.target.value })}
            />

            <TextField
              className="page__form"
              label="Max"
              type="number"
              variant="outlined"
              margin="normal"
              value={this.state.max}
              onChange={e => this.setState({ max: e.target.value })}
            />

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>Fermer</Button>
            <Button type='submit' variant="contained" color="primary">Valider</Button>
          </DialogActions>
        </form>
      </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(PlayerDetails);