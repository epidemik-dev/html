/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global google */
var splits;
var diseases = [];
var numXY = 20;
var latLongDisease;
var allRects = [];
var lastTime = -100;
var hasLoaded = false;

var lastCenter = null;
var lastZoom = null;


// Map -> Void
// Adds the proper overlays to the map
function getData(map) {
    // Sending and receiving data in JSON format using POST method
    var URL = "http://localhost:3000/diseases"
    network_get_all_diseases(localStorage['token'], function(response) {
        diseases = response;
        addOverlays(map);
    }, function(xhr) {
        displayLogin();
    });
}

// Map -> Void
// Adds the overlays to the map
function addOverlays(map) {
    var time = lastTime
    var seconds = new Date().getTime() / 1000;
    lastTime = seconds
    var curCenter = map.getCenter();
    var curZoom = map.getZoom();
    if((lastZoom != null && lastZoom != curZoom) || (lastCenter != null && Math.abs(curCenter.lat() - lastCenter.lat()) < 0.01) 
        || (lastCenter != null && Math.abs(curCenter.lng() - lastCenter.lng()) < 0.01)) {
            return;
    }
    lastZoom = curZoom;
    lastCenter = curCenter;
    var bounds = map.getBounds();
    if(bounds === undefined) {
        return;
    }
    var ne = bounds.getNorthEast(); // LatLng of the north-east corner
    var sw = bounds.getSouthWest(); // LatLng of the south-west corder
    var startLat = sw.lat();
    var startLong = sw.lng();
    var averageIntensity = 1.0;
    var latWidth = Math.abs(sw.lat() - ne.lat());
    var longWidth = Math.abs(sw.lng() - ne.lng());
    //map.removeOverlays(map.overlays)
    this.latLongDisease = [[]];
    for (var i = 0; i < 100; i++) {
        this.latLongDisease.push([]);
        for (var i2 = 0; i2 < 100; i2++) {
            this.latLongDisease[i].push("");
        }
    }
    var realPointCounts = 1.0;
    var intervalLat = latWidth / numXY;
    var intervalLong = longWidth / numXY;
    for (const i in diseases) {
        var data = diseases[i];
        var deltaLat = data.latitude - startLat;
        let deltaLong = data.longitude - startLong;
        if (deltaLong > 0 && deltaLat > 0 && deltaLat < latWidth && deltaLong < longWidth) {
            var posnLat = (Math.floor(deltaLat / (latWidth / numXY)));
            var posnLong = (Math.floor(deltaLong / (longWidth / numXY)));
            var realLat = (posnLat) * intervalLat + startLat;
            var realLong = (posnLong) * intervalLong + startLong;
            var scaleLat = latWidth / numXY;
            var scaleLong = longWidth / numXY;
            var bounds = {
                north: realLat + scaleLat,
                south: realLat,
                east: realLong + scaleLong,
                west: realLong
            };
            if (posnLat >= this.latLongDisease.length || posnLong >= this.latLongDisease[posnLat].length) {
                continue;
            }
            if (this.latLongDisease[posnLat][posnLong] === "") {
                this.latLongDisease[posnLat][posnLong] = new DiseasePolygon(bounds, 0);
                realPointCounts += 1;
            }
            averageIntensity += 1;
            this.latLongDisease[posnLat][posnLong].addIntensity();
        }
    }
    averageIntensity /= realPointCounts;
    map.totalOverlays = (realPointCounts);
    clearOverlays(map);
    for (const x in this.latLongDisease) {
        for (const y in this.latLongDisease[x]) {
            if (this.latLongDisease[x][y] !== "") {
                var power = (this.latLongDisease[x][y].intensity / averageIntensity);
                var toAdd = new google.maps.Rectangle({
                    bounds: this.latLongDisease[x][y].bounds,
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
    }
    hasLoaded = true;
}

// Map -> Void
// Removes all overlays from the map
function clearOverlays(map) {
    for (const x in this.allRects) {
        if (this.allRects[x] !== "") {
            allRects[x].setMap(null);
        }
    }
}
/*
var corner;

// Branch Number Number Number Number -> Void
//Returns the count of all the disease points in this range
function getWeightForRange(branch, curLatMin, curLatMax, curLongMin, curLongMax) {
    return this.corner.getWeightForRange(curLatMin, curLatMax, curLongMin, curLongMax);
}

// Branch Number Number -> Branch
//Adds this disease point to the data structure
function addDisease(branch, lat, long) {
    if (isInRange(this.corner, lat, long)) {
        if(branch.numDiseases == undefined) {
            branch.topLeft = branch.topLeft.addDisease(lat, long);
            branch.topRight = branch.topRight.addDisease(lat, long);
            branch.bottomLeft = branch.bottomLeft.addDisease(lat, long);
            branch.bottomRight = branch.bottomRight.addDisease(lat, long);
        } else {
            branch.numDiseases += 1;
        }
    }
    return branch;
}

// Branch -> Int
// Returns the count of every disease stored in the system
function getAll(branch) {
    return this.corner.getAll()
}

// Branch Number Number -> Boolean
// Says if the branch is in range
function isInRange(diseaseItem, lat, long) {
    return lat >= diseaseItem.latMin && lat <= diseaseItem.latMax && long >= diseaseItem.longMin && long <= diseaseItem.longMax;
}


// A Branch is one OF
// - DiseaseBranch
// - DiseaseLeaf

class DiseaseBranch {

    constructor(latMin, latMax, longMin, longMax, topLeft, topRight, bottomLeft, bottomRight) {
        this.latMin = latMin
        this.latMax = latMax
        this.longMin = longMin
        this.longMax = longMax
        this.topLeft = topLeft
        this.topRight = topRight
        this.bottomLeft = bottomLeft
        this.bottomRight = bottomRight
    }

}

class DiseaseLeaf {

    constructor(latMin, latMax, longMin, longMax, numDiseases) {
        this.latMin = latMin
        this.latMax = latMax
        this.longMin = longMin
        this.longMax = longMax
        this.numDiseases = numDiseases;
    }

}
*/