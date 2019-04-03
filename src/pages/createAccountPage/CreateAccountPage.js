import React, { Component } from 'react';
import CardRegistration from '../../components/CreateAccount/CardRegistration';

import './CreateAccountPage.scss';

class RegistrationPage extends Component{

    render(){
        return(
            <div id='pageRegistr'>
                <CardRegistration id='cardRegistr' />
            </div>
        );
    }
}

export default RegistrationPage;
