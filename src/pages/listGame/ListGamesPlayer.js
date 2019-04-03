import React from 'react';

import Panel from '../../components/Panel/PanelPayer';
import './ListGame.scss';

import { getUser } from './../../lib/userData/manager';

class ListGamePlayer extends React.Component {
  listGames = undefined;

  constructor(){
    super();
    this.listGames = getUser().playerGames;
  }

  render() {
    // var listGames = getUser().playerGames;

    return (
      <div className='list-game-page'>
        {
          this.listGames.map(elt => (
            <Panel key={elt.id} gameName={elt.name} gmName={elt.gameMaster} description={elt.description} gameObject={elt}/>
          ))
        }
      </div>
    );
  }
}

export default ListGamePlayer;