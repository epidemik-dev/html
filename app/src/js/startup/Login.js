import NetworkAPI from "../network_api/NetworkAPI.js";
import React from 'react'

export class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.switchToCreate = props.switchToCreate
    this.turnToMain = props.turnToMain
  }

  render() {
    return (
      <div className="LoginPage">
        {/*<div className="imgcontainer">
          <img src="./img/epidemik.png" alt="logo" className="logo"></img>
    </div>*/}

        <div className="container" id="loginTexts">
          <label>
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required></input>

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required></input>
        </div>

        <button type="submit" onClick={this.loginReact()}>Login</button>

        <div className="container" id="buttons">
          <button
            type="button"
            className="cancelbtn"
            id="createAcc"
            onClick={this.switchToCreate}>Create An Account</button>
        </div>
      </div>
    );
  }

  loginReact() {
    var cur = this
    return function() {
      const username = document.getElementsByName("uname")[0].value
      const password = document.getElementsByName("psw")[0].value
      NetworkAPI.network_login(username, password, (auth_token) => {
        console.log(auth_token)
        localStorage["auth_token"] = auth_token
        cur.turnToMain();
      }, (error) => {
        console.log(error, "error");
        document.getElementsByName("uname")[0].value = "Invalid username/password"
      })
    }
  }
}
