import DiseaseManager from "../js/map/DiseaseManager"

const chai = require("chai");
var expect = chai.expect;


var manager = new DiseaseManager(-180, 180, -360, 360);

manager.addDisease(1, 1);
manager.addDisease(2, 3);
manager.addDisease(100, 1);
manager.addDisease(-10, 20);
manager.addDisease(-10, 50);
manager.addDisease(20, -100);
manager.addDisease(0, 0);


it("should return the proper results", () => {
    expect(manager.getAll()).to.be.equal(7)
    expect(manager.getWeightForRange(-1000, 1000, -1000, 1000)).to.be.equal(7)
    expect(manager.getWeightForRange(-0.1, 10, -0.1, 10)).to.be.equal(3)
    expect(manager.getWeightForRange(-10, 10, -0.1, 40)).to.be.equal(4)
})
