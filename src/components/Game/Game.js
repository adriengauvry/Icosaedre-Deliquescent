import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import temple from '../../images/temple.jpg';
import coin from '../../images/coin.png';
import shield from '../../images/shield.png';
// import gnome from '../../images/gnome.png';
// import gopnik from '../../images/gopnik.png'

import './Game.scss'
import Item from '../Item/Item';
// CHANGE: Utiliser this.currentGame.players
const objects = [
  {
    id: 1,
    img: coin,
    title: 'coin',
    x: 0.25,
    y: 0.75,
  },
  {
    id: 2,
    img: shield,
    title: 'shield',
    x: 0.5,
    y: 0.5,
  },

];

// const players = [
//   {
//     id: 1,
//     img: gopnik,
//     name: 'sverb'
//   },
//   {
//     id: 2,
//     img: gnome,
//     name: 'gnum gnum'
//   }

// ]



const styles = theme => ({
  borderColor: {
    'text-align': 'center',
    'height' : '100vh',
    'max-width' : '100%',
    'margin-left' : 'auto',
    'margin-right' : 'auto',
  },
});


class Game extends React.Component {


  state = {
    //pos: '-70%',
  };
  handleChange = pos => event => {
    this.setState({ pos: pos });
  };


  render() {
    const { classes } = this.props;


    return (
      <div id="contentContainer" className={classes.borderColor}>
        <img alt="" draggable="false" className='map__image' src={temple}></img>
        {objects.map(obj => (
          <Item id={obj.id} img={obj.img} title={obj.title} key={obj.id} cordX={obj.x} cordY={obj.y}
          ></Item>
        ))}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Game);