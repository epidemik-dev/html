export class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.switchToCreate = props.switchToCreate
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
            id="usernameText"
            placeholder="Enter Username"
            name="uname"
            required></input>

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            id="passwordText"
            placeholder="Enter Password"
            name="psw"
            required></input>
        </div>

        <button type="submit" onClick={this.loginReact}>Login</button>

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

  loginReact() {}
}
