import React from 'react';
import { Typography, Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getUser } from './../../lib/userData/manager'

import './Panel.scss';

class PanelPlayer extends React.Component {
  gameObject = undefined;
  state = {
    gameName: '',
    description: '',
  };

  constructor(props) {
    super();
    this.state.gameName = props.gameName;
    this.state.description = props.description;
    this.gameObject = props.gameObject;
  }

  join = () => {
    getUser().currentGame = this.gameObject;
  }

  render() {
    return (
      <Paper className='page-list-game'>
        <Typography variant='h5'>{this.state.gameName}</Typography>
        <Typography>{this.state.description}</Typography>
        <div className='page-list-game__buttons'>
          <Button component={Link} to='/connected/game' size="small" variant='contained' color="primary" onClick={this.join}>
            Rejoindre
          </Button>
        </div>
      </Paper>
    );
  }
}

export default PanelPlayer;