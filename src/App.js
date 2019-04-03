import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Cookie from "js-cookie";
import './App.scss';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CardConnection from './pages/connectionPage/ConnectionPage';
import CreateAccountPage from "./pages/createAccountPage/CreateAccountPage"
import loremIpsum from "./pages/loremIpsum";
import ToolbarConnection from "./components/ToolbarConnection";
import themeC from './lib/themes';
import ToolbarAccount from './components/ToolbarAccount/ToolbarAccount';
import SwitchButton from '@material-ui/core/Switch';
import { Typography, CssBaseline, AppBar, Toolbar, IconButton, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, withMobileDialog, Fab, Menu } from '@material-ui/core';

import { Settings, Brightness5, Brightness2, ColorLens } from '@material-ui/icons';


class App extends Component {
  state = {
    theme: undefined,
    color: undefined,
    typeTheme: false,
    anchorEl: null,
    open: false,
  }

  constructor(props) {
    super(props);
    let themeType = (Cookie.get('themeType')) ? Cookie.get('themeType') : 'default';
    let themeColor = (Cookie.get('themeColor')) ? Cookie.get('themeColor') : 'red';
    this.state.theme = themeC(themeType, themeColor);
    this.state.color = themeColor;
    this.state.typeTheme = (themeType === 'dark');
  }

  handleChange = (name, value) => event => {
    this.setState({ [name]: value });
    if(name === 'theme'){
      this.setTheme(this.state.typeTheme ? 'dark' : 'default', value);
    }
    if(name === 'anchorEl' && value === 'open'){
      this.setState({ [name]: event.currentTarget });
    }
  };

  setTheme(theme, color) {
    this.setState({ color: color });
    if (theme === 'dark') {
      this.setState({ theme: themeC('dark', color) });
    }
    else {
      this.setState({ theme: themeC('light', color) });
    }
    Cookie.set('themeType', theme, { expires: 365 });
    Cookie.set('themeColor', color, { expires: 365 });
  }

  handleThemeChange = event => {
    this.setState({ typeTheme: event.target.checked });
    if (this.state.typeTheme === false) {
      this.setState({ typeTheme: true })
      this.setTheme('dark', this.state.color);
    }
    else {
      this.setTheme('default', this.state.color);
    }
  };

  render() {
    const { fullScreen } = this.props;
    const { anchorEl } = this.state;

    return (
      <MuiThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <BrowserRouter>
          <div>
              <AppBar position="static" className="appbar">
                <Toolbar>
                  <Switch>
                    <Route exact path='/' component={ToolbarConnection} />
                    <Route exact path='/create-account' component={ToolbarConnection} />
                    <PrivateRoute path='/connected' component={ToolbarAccount} />
                  </Switch>
                  <IconButton id="appbar__settings" onClick={this.handleChange('anchorEl', 'open')} color="inherit">
                    <Settings />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleChange('anchorEl', null)}>
                    <MenuItem>
                      {this.state.typeTheme ? <Brightness2 /> : <Brightness5 />}
                      <SwitchButton checked={this.state.typeTheme} onChange={this.handleThemeChange} />
                    </MenuItem>
                    <MenuItem onClick={this.handleChange('open', true)}>
                      <ColorLens />
                      Changer la couleur
                    </MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>
            <Switch>
              <Route exact path='/' component={CardConnection} />
              <Route exact path='/create-account' component={CreateAccountPage} />
              <PrivateRoute path='/connected' component={loremIpsum} />
              
            </Switch>
            <Dialog
              fullScreen={fullScreen}
              open={this.state.open}
              aria-labelledby="responsive-dialog-title"
              className="dialog"
            >
              <DialogTitle id="responsive-dialog-title">Couleurs disponibles</DialogTitle>
              <DialogContent id='dialog__fabs'>
                <Fab id='dialog__fabs__green' size='small' onClick={this.handleChange('theme', 'green')}>
                  <Typography />
                </Fab>
                <Fab id='dialog__fabs__yellow' size='small' onClick={this.handleChange('theme', 'yellow')}>
                  <Typography />
                </Fab>
                <Fab id='dialog__fabs__red' size='small' onClick={this.handleChange('theme', 'red')}>
                  <Typography />
                </Fab>
                <Fab id='dialog__fabs__pink' size='small' onClick={this.handleChange('theme', 'pink')}>
                  <Typography />
                </Fab>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleChange('open', false)} color="primary" autoFocus>
                  Fermer
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withMobileDialog()(App);

/*
Maître Nicolas nous guide. Maître Nicolas nous dispense son enseignement.
Maître Nicolas nous protège. À sa lumière, nous nous épanouissons. Dans
sa bienveillance nous nous réfugions. Devant sa sagesse, nous nous inclinons.
Nous existons pour le servir et nos vie lui appartiennent.
*/
