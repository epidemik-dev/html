var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { NetworkAPI } from "../network_api/NetworkAPI.js";

export var LoginPage = function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage(props) {
    _classCallCheck(this, LoginPage);

    var _this = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));

    _this.switchToCreate = props.switchToCreate;
    _this.turnToMain = props.turnToMain;
    return _this;
  }

  _createClass(LoginPage, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "LoginPage" },
        React.createElement(
          "div",
          { className: "container", id: "loginTexts" },
          React.createElement(
            "label",
            null,
            React.createElement(
              "b",
              null,
              "Username"
            )
          ),
          React.createElement("input", {
            type: "text",
            placeholder: "Enter Username",
            name: "uname",
            required: true }),
          React.createElement(
            "label",
            null,
            React.createElement(
              "b",
              null,
              "Password"
            )
          ),
          React.createElement("input", {
            type: "password",
            placeholder: "Enter Password",
            name: "psw",
            required: true })
        ),
        React.createElement(
          "button",
          { type: "submit", onClick: this.loginReact },
          "Login"
        ),
        React.createElement(
          "div",
          { className: "container", id: "buttons" },
          React.createElement(
            "button",
            {
              type: "button",
              className: "cancelbtn",
              id: "createAcc",
              onClick: this.switchToCreate },
            "Create An Account"
          )
        )
      );
    }
  }, {
    key: "loginReact",
    value: function loginReact() {
      cur = this;
      var username = document.getElementsByName("uname")[0].value;
      var password = document.getElementsByName("psw")[0].value;
      NetworkAPI.network_login(username, password, function (auth_token) {
        localStorage["auth_token"] = auth_token;
        cur.turnToMain();
      }, function () {
        document.getElementsByName("uname")[0].value = "Invalid username/password";
      });
    }
  }]);

  return LoginPage;
}(React.Component);