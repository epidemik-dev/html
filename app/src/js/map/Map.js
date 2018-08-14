import {map_style} from './MapPrefs.js'
import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export class Map extends Component {
    componentDidUpdate(prevProps, prevState) {
        this.loadMap();
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
    
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            var uluru = {lat: 42.4706918, lng: -71.0628642};
            const center = new maps.LatLng(42.4706918, -71.0628642);
            const mapConfig = Object.assign({}, {
                zoom: 5,
                center: uluru,
                minZoom: 5,
                maxZoom: 15,
                disableDefaultUI: true,
                style: map_style
                
            })
            this.map = new maps.Map(document.getElementById("map-container"), mapConfig);
            this.map.setOptions({styles: map_style});
            this.map.addListener('bounds_changed', function () {
        
            });
        }
    }

    render() {
        return (
            <div ref='map'>
            Loading map...
            </div>
        )
    }
}

  /*
// Adds an overlay to the map
function addOverlay() {
    var rectangle = new window.google.maps.Rectangle({
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
*/