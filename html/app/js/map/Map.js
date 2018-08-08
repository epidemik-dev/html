var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { map_style } from './MapPrefs.js';

var Map = function (_React$Component) {
    _inherits(Map, _React$Component);

    function Map() {
        _classCallCheck(this, Map);

        return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).apply(this, arguments));
    }

    _createClass(Map, [{
        key: 'render',
        value: function render() {}
    }]);

    return Map;
}(React.Component);

// Void -> Void
//Creates this map object and adds the overlays to the map


function initMap() {
    var uluru = { lat: 42.4706918, lng: -71.0628642 };
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: uluru,
        minZoom: 5,
        maxZoom: 15,
        disableDefaultUI: true,
        style: map_style
    });
    this.map.setOptions({ styles: map_style });
    this.map.addListener('bounds_changed', function () {
        addOverlays(map);
    });
    getData(this.map);
}

// Adds an overlay to the map
function addOverlay() {
    var rectangle = new google.maps.Rectangle({
        bounds: this.bounds,
        editable: false,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.1,
        map: this.map
    });
}