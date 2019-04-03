import React from 'react';

import Panel from '../../components/Panel/Panel';
import './ListGame.scss';

import { getUser } from './../../lib/userData/manager';

class ListGame extends React.Component {
  state = {
    listGames: null,
  };

  constructor(){
    super();
    this.state.listGames = getUser().gameMasterGames;
    // this.state.listGames = [{id: 1, name: 'Test', description: 'test description'}, {id: 2, name: 'Test 2', description: 'test description 2'}];
    // console.log(getUser().gameMasterGames);
  }

  render() {  
    // var listGames = getUser().gameMasterGames;
    return (
      <div className='list-game-page' id='list-game'>
        {
          this.state.listGames.map(elt => (
            <Panel id={elt.id} key={elt.id} gameName={elt.name} gmName={elt.gameMaster} description={elt.description} gameObject={elt} />
          ))
        }
      </div>
    );
  }
}

export default ListGame;