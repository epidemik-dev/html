export class CreatePage extends React.Component {

  genderSelector = (
    <div>Select ur gender</div>
  )
  illnessSelector = (
    <div>Select ur gender</div>
  )
  ageSelector = (
    <div>Select ur gender</div>
  )
  dimensionSelector = (
    <div>Select ur gender</div>
  )
  addressSelector = (
    <div>Select ur gender</div>
  )
  usernameSelector = (
    <div className="container" id="createTexts">
      <label>
        <b>Username</b>
      </label>
      <input
        type="text"
        id="usernameText"
        placeholder="Create Username"
        name="uname"
        required></input>

      <label>
        <b>Password</b>
      </label>
      <input
        type="password"
        id="passwordText"
        placeholder="Create Password"
        name="psw"
        required></input>
    </div>
  );

  constructor(props) {
    super(props);
    this.state = {
      stage: 0
    }
  }

  render() {
    if (this.state.stage === 0) {
      return this.getBody(this.genderSelector);
    } else {
      return this.getBody(this.usernameSelector);
    }
  }

  getBody(cur_stage) {
    return (
      <div className="CreatePage">
        {cur_stage}
        <button
            type="button"
            onClick={this.nextItem()}>Next</button>
      </div >
    )
  }

  nextItem() {
      var cur = this;
      return function() {
        cur.setState({stage: cur.state.stage+1})
      }
  }
}