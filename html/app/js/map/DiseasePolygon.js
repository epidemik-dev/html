var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var DiseasePolygon = function () {
    // The data structure that stores the data for one
    // Overlay on the map

    function DiseasePolygon(bounds, intensity) {
        _classCallCheck(this, DiseasePolygon);

        this.bounds = bounds;
        this.intensity = intensity;
    }

    _createClass(DiseasePolygon, [{
        key: "addIntensity",
        value: function addIntensity() {
            this.intensity += 1;
        }
    }]);

    return DiseasePolygon;
}();