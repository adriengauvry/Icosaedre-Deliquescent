import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons'
import './Stat.scss'

const Stats = (props) => {

    return (
      <div>
        <TextField label="Nom" variant="outlined" onChange={props.changeEvent} value={props.children} />
        <TextField label="Actuel" variant="outlined" onChange={props.changeEvent} value={props.children} />
        <TextField label="Max" variant="outlined" onChange={props.changeEvent} value={props.children} />
        <Button onClick={props.delEvent}><Delete /></Button>
      </div>
    )
  }


export default Stats;