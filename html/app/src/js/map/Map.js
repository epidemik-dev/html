import {map_style} from './MapPrefs.js'

class Map extends React.Component {

  render() {

  }

}

// Void -> Void
//Creates this map object and adds the overlays to the map
function initMap() {
    var uluru = {lat: 42.4706918, lng: -71.0628642};
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: uluru,
        minZoom: 5,
        maxZoom: 15,
        disableDefaultUI: true,
        style: map_style
    });
    this.map.setOptions({styles: map_style});
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