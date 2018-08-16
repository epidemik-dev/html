import NetworkAPI from "../../network_api/NetworkAPI.js";
import React, {Component} from 'react'

export class CreatePage extends Component {

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
      return this.getBody((
        <GenderSelector></GenderSelector>
      ));
    } else if (this.state.stage === 1) {
      return this.getBody(
        <IllnessSelector></IllnessSelector>
      );
    } else if (this.state.stage === 2) {
      return this.getBody(
        <AgeSelector></AgeSelector>
      );
    } else if (this.state.stage === 3) {
      return this.getBody(
        <DimensionSelector></DimensionSelector>
      );
    } else if (this.state.stage === 4) {
      return this.getBody(
        <AddressSelector></AddressSelector>
      );
    } else if (this.state.stage === 5) {
      if(document.getElementsByName("street")[0] !== undefined) {
        document.getElementsByName("street")[0].value = ""
        document.getElementsByName("city")[0].value = ""
      }
      return this.getBody(
        <UsernameSelector></UsernameSelector>
      );
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
        console.log(username, password, latitude, longitude, "2000-01-01", "Male");
        NetworkAPI.network_create_an_account(username, password, latitude, longitude, "2000-01-01", "Male", (auth_token) => {
          localStorage["auth_token"] = auth_token;
          localStorage["username"] = username;
          console.log(cur);
          cur.turnToMain();
        }, (failure) => {
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
}

class UsernameSelector extends Component {
  render() {
    return <div className="username" id="createTexts">
      <label>
        <b>Username</b>
      </label>
      <input type="text" name="uname" required></input>

      <label>
        <b>Password</b>
      </label>
      <input type="password" name="psw" required></input>
    </div>
  }
}

class AddressSelector extends Component {
  render() {
    return <div className="address" id="createAddress">
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
  }
}

class DimensionSelector extends Component {
  render() {
    var to_inject = []
    for(var feet = 3; feet <= 8; feet++) {
      for(var inches = 0; inches <= 11; inches++) {
        to_inject.push(<option key={feet*12+inches}>{feet + "'" + inches + "\" tall"}</option>)
      }
    }
    return <select id="height_selector">{to_inject}</select>
  } 
}

class IllnessSelector extends Component {
  render() {
    return <form>
      <span>Hypertension</span>
      <input type="checkbox" id="Male" name="hypertension"></input>
      <br></br>
      <span>Diabetes</span>
      <input type="checkbox" id="Female" name="diabetes"></input>
      <br></br>
      <span>Smoke</span>
      <input type="checkbox" id="Other" name="smoke"></input>
      <br></br>
      <span>High Cholesterol</span>
      <input type="checkbox" id="Other" name="cholesterol"></input>
      <br></br>
    </form>
  }
}

  class AgeSelector extends Component {
    render() {
      var to_inject = [<option key="0">{"< 12 Months Old"}</option>]
      for(var i = 1; i <151; i++) {
        to_inject.push(<option key="1">{i + " Years Old"}</option>)
      }
      return <select id="age_selector">{to_inject}</select>
    } 
  }

  class GenderSelector extends Component {
    render() {
      return (
        <form>
          <span>Male</span>
          <input type="radio" id="Male" name="gender"></input>
          <br></br>
          <span>Female</span>
          <input type="radio" id="Female" name="gender"></input>
          <br></br>
          <span>Other</span>
          <input type="radio" id="Other" name="gender"></input>
          <br></br>
        </form>
      )
    }
}