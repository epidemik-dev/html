var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { login_is_valid } from './startup/LoginChecker.js';
import { LoginPage } from './startup/Login.js';
import { CreatePage } from './startup/create/Create.js';

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    // State
    // login: 0 = display login, 1 = display create, 2 = display main

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            login: 0
        };

        login_is_valid(function (is_valid) {
            if (is_valid === false) {
                _this.state = {
                    login: 0
                };
            } else {
                _this.state = {
                    login: 2
                };
            }
        });
        return _this;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            if (this.state.login === 0) {
                return React.createElement(LoginPage, { switchToCreate: this.turnToCreate(), turnToMain: this.turnToMain() });
            } else if (this.state.login === 1) {
                return React.createElement(CreatePage, null);
            } else if (this.state.login === 2) {
                return React.createElement(
                    'div',
                    null,
                    'Not Loggin'
                );
            } else {
                return React.createElement(LoginPage, { switchToCreate: this.turnToCreate(), turnToMain: this.turnToMain() });
            }
        }
    }, {
        key: 'turnToCreate',
        value: function turnToCreate() {
            var view = this;
            return function () {
                view.setState({ login: 1 });
            };
        }
    }, {
        key: 'turnToMain',
        value: function turnToMain() {
            var view = this;
            return function () {
                view.setState({ login: 2 });
            };
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app-container"));