import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, withMobileDialog } from '@material-ui/core';
import './ListObjectPage.scss';

//-----------------------------------------------------------------------
var stats = ['COU', 'INT', 'CHA', 'ADR', 'FOI'];

let id = 0;
function createData(name, cou, int, cha, adr, foi) {
  id += 1;
  return { id, name, cou, int, cha, adr, foi };
}

var objects = [
  createData('Couronne de feu', 0, 0, 2, 4, -1),
  createData('Bague d\'intelligence', 0, 5, 0, 0, 0),
  createData('Poudre explosif', 0, 0, 0, 0, 0),
];
//-----------------------------------------------------------------------

class ListObjectPage extends Component {
  state = {
    open: false,
    objectName: '',
    description: '',
  };

  constructor(){
    super();
    let tmp = [];
    stats.forEach(element => {
      tmp[element] = 0;
    });
    this.state.stastistiques = tmp;
  }

  handleChangeStats = (name, stat) => event => {
    let tmp = [];
    tmp = name;
    tmp[stat] = event.target.value;
    this.setState({
      stastistiques: tmp,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.stastistiques instanceof Array);
    // TODO : BDD
  };

  render() {

    const { fullScreen } = this.props;
    return (
      <div className='page'>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen={fullScreen}
        >
          <DialogTitle>Créer un objet</DialogTitle>
          <form className='page__form' id='test' onSubmit={this.handleSubmit}>
            <DialogContent>
              <TextField
                className="page__form__input"
                label="Nom de l'objet"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={this.state.objectName} onChange={this.handleChange('objectName')}
              />

              <TextField
                className="page__form__input"
                label="Description"
                multiline
                rows="5"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={this.state.description} onChange={this.handleChange('description')}
              />

              {
                stats.map(stat => (
                  <div className="page__form__stat" key={stat}>
                    <TextField
                      id={stat}
                      label={stat}
                      type="number"
                      variant="outlined"
                      margin="normal"
                      value={this.state.stastistiques[stat]} onChange={this.handleChangeStats(this.state.stastistiques, stat)}
                    />
                  </div>
                ))
              }
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleClose}>Fermer</Button>
              <Button type='submit' variant="contained" color="primary">Valider</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Button className='page__paper__add' color='primary' variant='contained' onClick={this.handleClickOpen}>Ajouter</Button>
        <div className='page__container'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom de l'objet</TableCell>
                {
                  stats.map(stat => (
                    <TableCell align="right" key={stat}>{stat}</TableCell>
                  ))
                }
                <TableCell align="right">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id='table_body'>
              {objects.map(object => {
                var isId = false;
                var row = [];
                for (const attribut in object) {
                  if (object.hasOwnProperty(attribut)) {
                    const element = object[attribut];
                    if(isId){
                      row.push(<TableCell align="right" key={attribut}>{element}</TableCell>);
                    }
                    isId = true;
                  }
                }
                row.push(<TableCell align="right" key={object.id}><Button onClick={()=>{document.getElementById('table_body').removeChild(document.getElementById('row_'+object.id))}} id={'deleteButton_' + object.id}>Supprimer</Button></TableCell>);
                return (
                  <TableRow key={object.id} id={'row_' + object.id}>
                    {row}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withMobileDialog()(ListObjectPage);