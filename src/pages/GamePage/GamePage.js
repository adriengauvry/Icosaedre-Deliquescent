import React from 'react';
import UploadImage from '../../components/UploadImage/UploadImage';
import PageStats from '../../components/CardStats/CardStats';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Switch, Link } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import MapIcon from "@material-ui/icons/Map";
import DiceIcon from "@material-ui/icons/Casino";
import Char from "@material-ui/icons/Accessibility";
import Toys from "@material-ui/icons/Toys"
import './GamePage.scss';
import Game from '../../components/Game/Game';
import ListObjectPage from './../../components/Objects/ListObjectPage';
import { getUser } from '../../lib/userData/manager';


class GamePage extends React.Component {
    gameObject = null;
    constructor(){
        super();
        this.gameObject = getUser().currentGame;
        this.gameObject.start();
    }

    render() {
        return (
            <div>
                <Switch>
                    <PrivateRoute exact path='/connected/game' component={Game} />
                    <PrivateRoute exact path='/connected/game/changeMap' component={UploadImage} />
                    <PrivateRoute exact path='/connected/game/objects' component={ListObjectPage} />
                    <PrivateRoute exact path='/connected/game/stats' component={PageStats} />
                </Switch>
                <BottomNavigation
                    className="GamePage__BottomNavigation"
                    onChange={this.handleChange}
                    showLabels
                >
                    <BottomNavigationAction component={Link} to='/connected/game' label="Jeu" icon={<DiceIcon />} ></BottomNavigationAction>
                    <BottomNavigationAction component={Link} to='/connected/game/changeMap' label="Changer Map" icon={<MapIcon />} />
                    <BottomNavigationAction component={Link} to='/connected/game/objects' label="Objets" icon={<Toys />} />
                    <BottomNavigationAction component={Link} to='/connected/game/stats' label="Statistiques" icon={<Char />} />
                </BottomNavigation>
            </div>
        );
    }
}

export default GamePage;
