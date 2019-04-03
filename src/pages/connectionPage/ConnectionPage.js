import React, { Component } from 'react';
import CardConnection from '../../components/Connection/CardConnection';

import './ConnectionPage.scss';
// require('./particles.js');

class ConnectionPage extends Component{

    componentDidMount(){
        // window.particlesJS.load('particles-js', './particlejs-config.json', function() {
        //     console.log('callback - particles.js config loaded');
        // });
    }

    render(){
        return(
            <div id='pageConnection'>
                <div id="particles-js"></div>
                <CardConnection id='cardConnection' />
            </div>
        );
    }
}

export default ConnectionPage;
