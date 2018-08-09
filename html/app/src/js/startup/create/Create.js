import {NetworkAPI} from "../../network_api/NetworkAPI.js";

export class CreatePage extends React.Component {

  constructor(props) {
    super(props);
    this.turnToMain = props.turnToMain
    this.state = {
      stage: 0,
      warning: ""
    }
  }

  render() {
    if (this.state.stage === 0) {
      return this.getBody(this.genderSelector);
    } else if (this.state.stage === 1) {
      return this.getBody(this.illnessSelector);
    } else if (this.state.stage === 2) {
      return this.getBody(this.ageSelector);
    } else if (this.state.stage === 3) {
      return this.getBody(this.dimensionSelector);
    } else if (this.state.stage === 4) {
      return this.getBody(this.addressSelector);
    } else if (this.state.stage === 5) {
      document.getElementsByName("street")[0].value = ""
      document.getElementsByName("city")[0].value = ""
      return this.getBody(this.usernameSelector);
    }
  }

  nextItem() {
    var cur = this;
    return function () {
      if (cur.state.stage === 4) { // Address is created and should be verified
        NetworkAPI.network_get_location(cur.getAddress(), (lat, long) => {
          cur.setState({stage: 5, warning: "", latitude: lat, longitude: long})
        }, () => {
          cur.setState({stage: 4, warning: "Please Enter a Valid Address"})
        })
      } else if (cur.state.stage === 5) { //Done and should create login
        const password = document.getElementsByName("psw")[0].value;
        const username = document.getElementsByName("uname")[0].value;
        const latitude = cur.state.latitude
        const longitude = cur.state.longitude
        if (password.length < 6 || password === "password") {
          cur.setState({stage: 5, warning: "Password too short", latitude: latitude, longitude: longitude})
          return;
        }
        NetworkAPI.network_create_an_account(username, password, latitude, longitude, "2000-01-01", "Male", (auth_token) => {
          localStorage["auth_token"] = auth_token;
          localStorage["username"] = username;
          cur.turnToMain();
        }, () => {
          cur.setState({stage: 5, warning: "Username already taken", latitude: latitude, longitude: longitude})
        })
      } else {
        cur.setState({
          stage: cur.state.stage + 1
        })
      }
    }
  }

  // Void -> String Returns the entered address as a string
  getAddress() {
    return document.getElementsByName("street")[0].value + " " + document.getElementsByName("city")[0].value + ", " + document.getElementsByName("state")[0].value
  }

  getBody(cur_stage) {
    return (
      <div className="CreatePage">
        {cur_stage}
        <button type="button" onClick={this.nextItem()}>Next</button>
        <div id="warning">{this.state.warning}</div>
      </div >
    )
  }

  genderSelector = (
    <div>Select ur gender</div>
  )
  illnessSelector = (
    <div>Select ur illnesses</div>
  )
  ageSelector = (
    <div>Select ur age</div>
  )
  dimensionSelector = (
    <div>Select ur weight/height</div>
  )
  addressSelector = (
    <div className="address" id="createAddress">
      <label>
        <b>Street</b>
      </label>
      <input type="text" name="street" required></input>

      <label>
        <b>City</b>
      </label>
      <input type="text" name="city" required></input>
      <label>
        <b>ST</b>
      </label>
      <input type="text" name="state" required></input>
    </div>

  )
  usernameSelector = (
    <div className="username" id="createTexts">
      <label>
        <b>Username</b>
      </label>
      <input type="text" name="uname" required></input>

      <label>
        <b>Password</b>
      </label>
      <input type="password" name="psw" required></input>
    </div>
  );
}