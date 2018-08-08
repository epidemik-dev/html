import {login_is_valid} from './startup/LoginChecker.js'
import {LoginPage} from './startup/Login.js'
import {CreatePage} from './startup/create/Create.js'

class App extends React.Component {

    // State
        // login: 0 = display login, 1 = display create, 2 = display main

    constructor(props) {
        super(props);

        this.state = {
            login: 0
        }

        login_is_valid((is_valid) => {
            if(is_valid === false) {
                this.state = {
                    login: 0
                }
            } else {
                this.state = {
                    login: 2
                }
            }
        })
    }

    render() {
        if(this.state.login === 0) {
            return (<LoginPage switchToCreate={this.turnToCreate()} turnToMain = {this.turnToMain()}></LoginPage>);
        } else if(this.state.login === 1) {
            return (<CreatePage></CreatePage>);
        } else if(this.state.login === 2) {
            return (<div>Not Loggin</div>);
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

ReactDOM.render(
    <App/>,
    document.getElementById("app-container")
  );