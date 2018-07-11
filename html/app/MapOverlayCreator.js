/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global google */

// A Branch is one OF
// - DiseaseBranch
// - DiseaseLeaf

class DiseaseBranch {

    constructor(latMin, latMax, longMin, longMax) {
        this.latMin = latMin
        this.latMax = latMax
        this.longMin = longMin
        this.longMax = longMax

        this.latWidth = (this.latMax - this.latMin)
        this.longWidth = (this.longMax - this.longMin)

        this.numDiseases = 0;
    }

    initSubbranches() {
        this.topLeft = new DiseaseBranch(this.latMin, this.latMin + this.latWidth / 2, this.longMin + this.longWidth / 2, this.longMax);
        this.topRight = new DiseaseBranch(this.latMin + this.latWidth / 2, this.latMax, this.longMin + this.longWidth / 2, this.longMax);
        this.bottomLeft = new DiseaseBranch(this.latMin, this.latMin + this.latWidth / 2, this.longMin, this.longMin + this.longWidth / 2);
        this.bottomRight = new DiseaseBranch(this.latMin + this.latWidth / 2, this.latMax, this.longMin, this.longMin + this.longWidth / 2);
    }

}

var splits;
var branch = new DiseaseBranch(-360, 360, -360, 360);
var numXY = 300;
var allRects = [];

var lastCenter = null;
var lastZoom = null;
var hasLoadedData = false;
var hasLoadedMap = false;


// Map -> Void
// Adds the proper overlays to the map
function getData(map) {
    // Sending and receiving data in JSON format using POST method
    var URL = "http://localhost:3000/diseases"
    network_get_all_diseases(localStorage['token'], function (response) {
        diseases = response;
        for (var i in diseases) {
            var data = diseases[i];
            branch = addDisease(branch, data.latitude, data.longitude);
        }
        hasLoadedData = true;
        addOverlays(map);
    }, function (xhr) {
        displayLogin();
    });
}

// Map -> Void
// Adds the overlays to the map
function addOverlays(map) {
    var curCenter = map.getCenter();
    var curZoom = map.getZoom();
    console.log(hasLoadedData, hasLoadedMap, lastZoom, curZoom, lastZoom === curZoom);
    if ((!hasLoadedData && !hasLoadedMap) || (lastZoom !== null || lastZoom === curZoom)) {
        return;
    }
    lastZoom = curZoom;
    lastCenter = curCenter;

    var startLat = -180
    var startLong = -360
    var latWidth = 360
    var longWidth = 720
    var intervalLat = latWidth / numXY;
    var intervalLong = longWidth / numXY;
    var diseasePolys = [];

    var realPointCounts = 1.0;
    var averageIntensity = 1.0;
    for (var i = 0; i < numXY; i++) {
        for (var i2 = 0; i2 < numXY; i2++) {
            var latMin = startLat + i * intervalLat;
            var latMax = startLat + (i + 1) * intervalLat;
            var longMin = startLong + i2 * intervalLong;
            var longMax = startLong + (i2 + 1) * intervalLong;
            var numDiseases = getWeightForRange(branch, latMin, latMax, longMin, longMax);
            if (numDiseases !== 0) {
                var bounds = {
                    north: latMax,
                    south: latMin,
                    east: longMax,
                    west: longMin
                }
                diseasePolys.push(new DiseasePolygon(bounds, numDiseases));
                realPointCounts += 1;
                averageIntensity += numDiseases;
            }
        }
    }
    averageIntensity /= realPointCounts;
    map.totalOverlays = (realPointCounts);
    clearOverlays(map);
    for (var i in diseasePolys) {
        var power = (diseasePolys[i].intensity / averageIntensity);
        var toAdd = new google.maps.Rectangle({
            bounds: diseasePolys[i].bounds,
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
    hasLoadedMap = true;
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

var errorBound = 0.005;


// Branch Number Number Number Number -> Void
//Returns the count of all the disease points in this range
function getWeightForRange(branch, curLatMin, curLatMax, curLongMin, curLongMax) {
    if (!rangeIsInRange(branch, curLatMin, curLatMax, curLongMin, curLongMax)) {
        return 0;
    } else if (branch.topLeft === undefined) {
        return branch.numDiseases;
    } else {
        return getWeightForRange(branch.topLeft, curLatMin, curLatMax, curLongMin, curLongMax) +
            getWeightForRange(branch.topRight, curLatMin, curLatMax, curLongMin, curLongMax) +
            getWeightForRange(branch.bottomLeft, curLatMin, curLatMax, curLongMin, curLongMax) +
            getWeightForRange(branch.bottomRight, curLatMin, curLatMax, curLongMin, curLongMax);
    }
}

// Branch Number Number -> Branch
//Adds this disease point to the data structure
function addDisease(branch, lat, long) {
    if (isSmallBranch(branch)) {
        branch.numDiseases += 1;
    } else {
        if (branch.topLeft === undefined) {
            branch.initSubbranches();
        }
        if (isInRange(branch.topLeft, lat, long)) {
            branch.topLeft = addDisease(branch.topLeft, lat, long);
        } else if (isInRange(branch.topRight, lat, long)) {
            branch.topRight = addDisease(branch.topRight, lat, long);
        } else if (isInRange(branch.bottomLeft, lat, long)) {
            branch.bottomLeft = addDisease(branch.bottomLeft, lat, long);
        } else if (isInRange(branch.bottomRight, lat, long)) {
            branch.bottomRight = addDisease(branch.bottomRight, lat, long);
        }
    }
    return branch;
}

// Branch -> Int
// Returns the count of every disease stored in the system
function getAll(branch) {
    if (branch === undefined) {
        return 0;
    } else if (branch.topLeft === undefined) {
        return branch.numDiseases;
    } else {
        return getAll(branch.topLeft) +
            getAll(branch.topRight) +
            getAll(branch.bottomLeft) +
            getAll(branch.bottomRight);
    }
}

// Branch -> Boolean
// Returns if the branch's range is in the error bound
function isSmallBranch(branch) {
    return branch.latMax - branch.latMin < errorBound && branch.longMax - branch.longMin < errorBound
}

// Branch Number Number -> Boolean
// Says if the branch is in range
function isInRange(diseaseItem, lat, long) {
    return lat >= diseaseItem.latMin && lat <= diseaseItem.latMax && long >= diseaseItem.longMin && long <= diseaseItem.longMax;
}

// Branch Number Number Number Number -> Boolean
// Says whether this range overlaps at all with the other range
function rangeIsInRange(branch, latMin, latMax, longMin, longMax) {
    return latMin <= branch.latMax && latMax >= branch.latMin && longMin <= branch.longMax && longMax >= branch.longMin;
}