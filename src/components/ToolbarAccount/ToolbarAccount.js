import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Typography,IconButton,Divider,ListItem,ListItemText,ListItemIcon,Drawer,List, Badge} from '@material-ui/core';
import './ToolbarAccount.scss'
import { getUser, logout } from "../../lib/userData/manager";
import {ExitToApp,Menu,ChevronLeft,ChevronRight} from "@material-ui/icons";
import { Redirect,Link } from "react-router-dom";
const drawerWidth = 240;





const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 10,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class ToolbarAccount extends React.Component {
  state = {
    logout: false,
  };

  optionsMJ = () => {
    if (getUser().isGM) {
      return <List>
        {[{text:'Parties MJ',link:'/connected/mj-games'}, {text:'Créer une partie', link:'/connected/create-game'}].map((obj, index) => (
          <ListItem button key={obj.text} component={Link} to={obj.link} onClick={this.handleDrawerClose}>
            <ListItemText primary={obj.text} />
          </ListItem>
        ))}
      </List >;
    }
    else{
      return null;
    }
  }

  setItemText = (obj) => {
    let nbInvitations = getUser().invitationGames.length;
    if(nbInvitations > 0 && obj.text === 'Invitations'){
      return(
      <Badge color="primary" badgeContent={nbInvitations}>
        <ListItemText primary={obj.text}  />
      </Badge>
      );
    }
    return(
      <ListItemText primary={obj.text}  />
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  flogout = () => {
    logout();
    this.setState({ logout: true });
  }
  
  render() {
    if (this.state.logout) return <Redirect to='/' />
    const { classes, theme } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerOpen}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <Menu />
        </IconButton>
        <Typography id="mess" variant="h6" color="inherit" noWrap>
          Bienvenue {getUser().username} !
        </Typography>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography
              variant="h6" color="primary">
              {getUser().username}
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[{text:'Parties Joueur', link:'/connected/player-games'}, {text:'Invitations',link:'/connected/invitations'}].map((obj, index) => (
              <ListItem button key={obj.text} component={Link} to={obj.link} onClick={this.handleDrawerClose}>
                {
                  this.setItemText(obj)
                }
              </ListItem>
            ))}
          </List>
          <Divider />
          {
            this.optionsMJ()
          }
          <Divider />
          <ListItem button onClick={this.flogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </Drawer>
      </div>
    );
  }
}

ToolbarAccount.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ToolbarAccount);
