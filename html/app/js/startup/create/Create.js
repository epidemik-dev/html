var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      "Select ur gender"
    );
    _this.ageSelector = React.createElement(
      "div",
      null,
      "Select ur gender"
    );
    _this.dimensionSelector = React.createElement(
      "div",
      null,
      "Select ur gender"
    );
    _this.addressSelector = React.createElement(
      "div",
      null,
      "Select ur gender"
    );
    _this.usernameSelector = React.createElement(
      "div",
      { className: "container", id: "createTexts" },
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
        id: "usernameText",
        placeholder: "Create Username",
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
        id: "passwordText",
        placeholder: "Create Password",
        name: "psw",
        required: true })
    );

    _this.state = {
      stage: 0
    };
    return _this;
  }

  _createClass(CreatePage, [{
    key: "render",
    value: function render() {
      if (this.state.stage === 0) {
        return this.getBody(this.genderSelector);
      } else {
        return this.getBody(this.usernameSelector);
      }
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
          {
            type: "button",
            onClick: this.nextItem() },
          "Next"
        )
      );
    }
  }, {
    key: "nextItem",
    value: function nextItem() {
      var cur = this;
      return function () {
        cur.setState({ stage: cur.state.stage + 1 });
      };
    }
  }]);

  return CreatePage;
}(React.Component);