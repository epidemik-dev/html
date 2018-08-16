import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import {login_is_valid} from './js/startup/LoginChecker'
import {LoginPage} from './js/startup/Login'
import {CreatePage} from './js/startup/create/Create'
import MapContainer from './js/map/MapContainer'

class App extends Component {

    // State
        // login: 0 = display login, 1 = display create, 2 = display main

    constructor(props) {
        super(props);

        this.state = {
            login: 0
        }
    }

    componentDidMount() {
        login_is_valid((is_valid) => {
            if(is_valid === false) {
                this.setState({login: 0})
            } else {
                this.setState({login: 2})
            }
        })
    }

    render() {
        if(this.state.login === 0) {
            return (<LoginPage switchToCreate={this.turnToCreate()} turnToMain = {this.turnToMain()}></LoginPage>);
        } else if(this.state.login === 1) {
            return (<CreatePage turnToMain = {this.turnToMain()}></CreatePage>);
        } else if(this.state.login === 2) {
            return (<MapContainer></MapContainer>);
        } else {
            return (<LoginPage switchToCreate={this.turnToCreate()} turnToMain = {this.turnToMain()}></LoginPage>);
        }
    }

    turnToCreate() {
        var view = this;
        return function() {
            view.setState({login: 1});
        }
    }

    turnToMain() {
        var view = this;
        return function() {
            view.setState({login: 2});
        }
    }
}

export default App;
