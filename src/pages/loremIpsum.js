import React from 'react';
// import { Typography } from '@material-ui/core';
// import img from './../images/mad-designer.png';
//import PageNewGame from './createGame/PageNewGame';
//import CreateAccountPage from "./createAccountPage/CreateAccountPage";
import GamePage from "./GamePage/GamePage";
// Page création d'objet
// import ListObjectPage from './../components/Objects/ListObjectPage';

// Page de création de partie
import PageNewGame from './createGame/PageNewGame';
import './PageStats.scss';
import { Route, Switch } from "react-router-dom";
// import PageTest from './PageTest'
import ListGame from './listGame/ListGame';
import ListGamePlayer from './listGame/ListGamesPlayer';
import InvitationPage from './InvitationPage/InvitationPage';

// import StatBuilder from './../components/StatBuilder/StatBuilder';
// import { Link } from 'react-router-dom';

// import { getUser } from './../lib/userData/manager';

/*
const Test =  ( classes, onClose, selectedValue, ...other ) => {
      return (
      <div>
        <Dialog classes={{ paper: classes.dialogPaper }} onClose={this.handleClose} {...other}>
          <div className="cc">
            <DialogTitle>Page stats / action</DialogTitle>
            <div className="PaperC">
              <div className="AA"><CardStats ></CardStats></div>
              <div className="BB"><CardAction></CardAction></div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
*/
// class Default extends React.Component {
//   render() {
//     return (
//       <center>
//         <Typography variant='h4'>
//           Certaines pages du site ne sont pas encore fonctionnelles, merci de votre patience.
//           </Typography>
//         <img src={img} alt='is-building' />
//       </center>
//       // <Button component={Link} to='/connected/game' type='submit' variant="contained" color="inherit">Test</Button>
//       // <StatBuilder />
//     );
//   }
// }

class LoremIpsum extends React.Component {

  render() {

    return (
      <div>

        {/* <ListObjectPage /> */}

          <Switch>
            <Route exact path="/connected" component={ListGamePlayer} />
            <Route exact path="/connected/player-games" component={ListGamePlayer} />
            <Route exact path="/connected/invitations" component={InvitationPage} />
            <Route exact path="/connected/mj-games" component={ListGame} />
            <Route exact path="/connected/create-game" component={PageNewGame} />
            <Route path="/connected/game" component={GamePage} />
          </Switch>
      </div>
    );
  }
}

export default LoremIpsum;