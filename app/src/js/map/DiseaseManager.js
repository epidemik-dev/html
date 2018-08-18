// A Branch is one OF
// - DiseaseBranch
// - DiseaseLeaf

export default class DiseaseManager {

    constructor(latMin, latMax, longMin, longMax) {
        this.branch = new DiseaseBranch(latMin, latMax, longMin, longMax)
    }

    getWeightForRange(curLatMin, curLatMax, curLongMin, curLongMax) {
        return getWeightForRange(this.branch, curLatMin, curLatMax, curLongMin, curLongMax)
    }

    addDisease(lat, long) {
        this.branch = addDisease(this.branch, lat, long)
    }

    getAll() {
        return getAll(this.branch)
    }

}

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

var errorBound = 0.005;


// Branch Number Number Number Number -> Int
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