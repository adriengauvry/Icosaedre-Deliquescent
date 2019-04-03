import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
// import chevre from '../../images/chevre.jpg';
// import temple from '../../images/temple.jpg';
import { getUser } from '../../lib/userData/manager';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
});


// pour tester la galerie
// const tileData = [
//        {
//          img: chevre,
//          title: '1'
//        },
//        {
//         img: temple,
//         title: '2'
//       },

//      ];


class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      img: '',
      data: this.props.imgs,
    };
  }




  selectImage = (img) => {
    // console.log(img);
    this.setState({
      img: img
    })
    return img;
  }

  deleteImage = () => {
    this.state.img.delete((err) => {
      if (err) return console.log(err);

      this.setState({ data: getUser().images });
      this.setState({ img: '' });
    });
  }

  render() {
    // console.log("oi " + getUser().images)
    const classes = this.props;
    // console.log(this.state.data);
    return (
      <div className={classes.root}>
        <div>
          <GridList className={classes.gridList} cols={4}>
            {this.state.data.map(tile => (
              <GridListTile key={tile.id} onClick={() => this.selectImage(tile)} >
                {/* {console.log(tile)} */}
                <img src={tile.data} alt={tile.name} />
                <GridListTileBar
                  title={tile.name}
                />
              </GridListTile>
            ))}
          </GridList>
          <img width="60px" height="60px" src={this.state.img.data} alt=""></img>

          <Button className="buttonValidationImage">Valider image</Button>
          <Button color='primary' className="buttonValidationImage" onClick={this.deleteImage} >Supprimer image</Button>
        </div>
      </div>
    );
  }
}
Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);