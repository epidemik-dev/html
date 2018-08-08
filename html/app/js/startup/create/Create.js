var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { NetworkAPI } from "../../network_api/NetworkAPI.js";

export var CreatePage = function (_React$Component) {
  _inherits(CreatePage, _React$Component);

  function CreatePage(props) {
    _classCallCheck(this, CreatePage);

    var _this = _possibleConstructorReturn(this, (CreatePage.__proto__ || Object.getPrototypeOf(CreatePage)).call(this, props));

    _this.genderSelector = React.createElement(
      "div",
      null,
      "Select ur gender"
    );
    _this.illnessSelector = React.createElement(
      "div",
      null,
      "Select ur illnesses"
    );
    _this.ageSelector = React.createElement(
      "div",
      null,
      "Select ur age"
    );
    _this.dimensionSelector = React.createElement(
      "div",
      null,
      "Select ur weight/height"
    );
    _this.addressSelector = React.createElement(
      "div",
      { className: "address", id: "createAddress" },
      React.createElement(
        "label",
        null,
        React.createElement(
          "b",
          null,
          "Street"
        )
      ),
      React.createElement("input", { type: "text", name: "street", required: true }),
      React.createElement(
        "label",
        null,
        React.createElement(
          "b",
          null,
          "City"
        )
      ),
      React.createElement("input", { type: "text", name: "city", required: true }),
      React.createElement(
        "label",
        null,
        React.createElement(
          "b",
          null,
          "ST"
        )
      ),
      React.createElement("input", { type: "text", name: "state", required: true })
    );
    _this.usernameSelector = React.createElement(
      "div",
      { className: "username", id: "createTexts" },
      React.createElement(
        "label",
        null,
        React.createElement(
          "b",
          null,
          "Username"
        )
      ),
      React.createElement("input", { type: "text", name: "uname", required: true }),
      React.createElement(
        "label",
        null,
        React.createElement(
          "b",
          null,
          "Password"
        )
      ),
      React.createElement("input", { type: "password", name: "psw", required: true })
    );

    _this.turnToMain = props.turnToMain;
    _this.state = {
      stage: 0,
      warning: ""
    };
    return _this;
  }

  _createClass(CreatePage, [{
    key: "render",
    value: function render() {
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
        return this.getBody(this.usernameSelector);
      }
    }
  }, {
    key: "nextItem",
    value: function nextItem() {
      var cur = this;
      return function () {
        if (cur.state.stage === 4) {
          // Address is created and should be verified
          NetworkAPI.network_get_location(cur.getAddress(), function (lat, long) {
            cur.setState({ stage: 5, warning: "", latitude: lat, longitude: long });
          }, function () {
            cur.setState({ stage: 4, warning: "Please Enter a Valid Address" });
          });
        } else if (cur.state.stage === 5) {
          //Done and should create login
          var password = document.getElementsByName("psw")[0].value;
          var username = document.getElementsByName("uname")[0].value;
          var latitude = cur.state.latitude;
          var longitude = cur.state.longitude;
          if (password.length < 6 || password === "password") {
            cur.setState({ stage: 5, warning: "Password too short", latitude: latitude, longitude: longitude });
            return;
          }
          NetworkAPI.network_create_an_account(username, password, latitude, longitude, "2000-01-01", "Male", function (auth_token) {
            localStorage["auth_token"] = auth_token;
            localStorage["username"] = username;
            cur.turnToMain();
          }, function () {
            cur.setState({ stage: 5, warning: "Username already taken", latitude: latitude, longitude: longitude });
          });
        } else {
          cur.setState({
            stage: cur.state.stage + 1
          });
        }
      };
    }

    // Void -> String Returns the entered address as a string

  }, {
    key: "getAddress",
    value: function getAddress() {
      return document.getElementsByName("street")[0].value + " " + document.getElementsByName("city")[0].value + ", " + document.getElementsByName("state")[0].value;
    }
  }, {
    key: "getBody",
    value: function getBody(cur_stage) {
      return React.createElement(
        "div",
        { className: "CreatePage" },
        cur_stage,
        React.createElement(
          "button",
          { type: "button", onClick: this.nextItem() },
          "Next"
        ),
        React.createElement(
          "div",
          { id: "warning" },
          this.state.warning
        )
      );
    }
  }]);

  return CreatePage;
}(React.Component);