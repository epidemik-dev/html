import {map_style} from './MapPrefs.js'
import React, { Component } from 'react';
import DiseaseManager from './DiseaseManager'
import NetworkAPI from '../network_api/NetworkAPI'
import DiseasePolygon from './DiseasePolygon'

export class Map extends Component {
    
    constructor(props) {
        super(props)

        this.manager = new DiseaseManager(-360, 360, -360, 360)
    }

    componentDidUpdate(prevProps, prevState) {
        this.loadMap();
        this.loadData();
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
    
            var uluru = {lat: 42.4706918, lng: -71.0628642};
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
            this.map.addListener('bounds_changed', () => {
                this.addOverlays()
            });
        }
    }

    loadData() {
        var map = this
        NetworkAPI.network_get_all_diseases(localStorage["auth_token"]).then(diseases => {
            for(var i = 0; i < diseases.length; i++) {
                map.manager.addDisease(diseases[i].latitude, diseases[i].longitude)
            }
            map.addOverlays()
        }).catch(error => {
        })
    }

    addOverlays() {
        var numXY = 100;
        var curCenter = this.map.getBounds();
        var startLat = curCenter.getSouthWest().lat();
        var startLong = curCenter.getSouthWest().lng();
        var endLat = curCenter.getNorthEast().lat();
        var endLong = curCenter.getNorthEast().lng();
        var latWidth = endLat - startLat;
        var longWidth = endLong - startLong;
        var intervalLat = latWidth / numXY;
        var intervalLong = longWidth / numXY;
        var diseasePolys = [];
        var realPointCounts = 1.0;
        this.averageIntensity = 1.0;
        for (var i = 0; i < numXY; i++) {
            for (var i2 = 0; i2 < numXY; i2++) {
                var latMin = startLat + i * intervalLat;
                var latMax = startLat + (i + 1) * intervalLat;
                var longMin = startLong + i2 * intervalLong;
                var longMax = startLong + (i2 + 1) * intervalLong;
                var numDiseases = this.manager.getWeightForRange(latMin, latMax, longMin, longMax);
                if (numDiseases !== 0) {
                    var bounds = {
                        north: latMax,
                        south: latMin,
                        east: longMax,
                        west: longMin
                    }
                    diseasePolys.push(new DiseasePolygon(bounds, numDiseases));
                    realPointCounts += 1;
                    this.averageIntensity += numDiseases;
                }
            }
        }
        this.averageIntensity /= realPointCounts;
        this.map.totalOverlays = (realPointCounts);
        this.clearOverlays();
        this.drawOverlays(diseasePolys)
    }

    // Map -> Void
    // Removes all overlays from the map
    clearOverlays() {
        for (const x in this.allRects) {
            if (this.allRects[x] !== "") {
                this.allRects[x].setMap(null);
            }
        }
    }

    drawOverlays(polys) {
        this.allRects = []
        const {google} = this.props;
        const maps = google.maps;
        for (var i in polys) {
            var power = (polys[i].intensity / this.averageIntensity);
            var toAdd = new maps.Rectangle({
                bounds: polys[i].bounds,
                editable: false,
                strokeColor: '#FF0000',
                strokeOpacity: 2 / 4 * power,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 1 / 4 * power,
                map: this.map
            });
            this.allRects.push(toAdd);
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