import React, { Component } from 'react';
import Action from '../Action/action';
import UniqueID from 'react-html-id';
import {Card,Button} from '@material-ui/core'
import {Add} from '@material-ui/icons'
import './CardAction.scss';

class CardActions extends Component {

  constructor() {
    super();
    UniqueID.enableUniqueIds(this);
    this.state = {
      action: [
        { id: this.nextUniqueId()},
      ]
    };

    console.log(this.state)
  }
  deleteStats = (index, e) => {
    if(index!==0){
    console.log(this.nextUniqueId())
    const action = Object.assign([], this.state.action);
    action.splice(index, 1);
    this.setState({ action: action });
    }
  }
  addStats = () => {
    console.log(this.nextUniqueId())
    const action = Object.assign([], this.state.action);
    action.splice(this.nextUniqueId(), '',0);
    this.setState({ action: action });
  }

  

  render() {

    return (
      <Card>
        <label>Actions:</label>
        <ul>
          {
            this.state.action.map((action, index) => {
              return (<div><Action
                delEvent={this.deleteStats.bind(this, index)}
                actual={action.actual}
                key={action.id} >{action.name}</Action></div>)
            })
          }
        </ul>
        <Button onClick={this.addStats}><Add /></Button>
      </Card>
    )
  }
}
export default CardActions
;