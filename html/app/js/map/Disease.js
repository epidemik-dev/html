var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Disease = function () {
    // The data structure that stores the information for a 
    // Single disease point

    function Disease(lat, long) {
        _classCallCheck(this, Disease);

        this.lat = parseFloat(lat);
        this.long = parseFloat(long);
    }

    _createClass(Disease, [{
        key: "toString",
        value: function toString() {
            return this.lat.toString() + " " + this.long.toString();
        }
    }, {
        key: "string",
        get: function get() {
            return this.toString();
        }
    }]);

    return Disease;
}();