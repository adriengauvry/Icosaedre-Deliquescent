import React from 'react';
import { Typography } from '@material-ui/core';
import img from './../images/mad-designer.png';
import './PageStats.scss';



class PageTest extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({open: false });
  };

  render() {
    return (
      <center>
        <Typography variant='h4'>
          Cette page n'est pas encore fonctionnelle merci de votre patience.
          </Typography>
        <img src={img} alt='is-building' />
      </center>
    );
  }
}

export default PageTest;