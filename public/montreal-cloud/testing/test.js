'use strict';

const expect = require('chai').expect;

const Cloud = require('../cloud');
const Cube = require('../cube');

describe ('Cloud tests', function() {
    let cloud;

    beforeEach(function() {
        cloud = new Cloud();
    })

    it('should be an object', function(done) {
        expect(cloud).to.be.a('object');
        done();
    })
})

describe ('Cube tests', function() {
    let cube;

    beforeEach(function() {
        let hasShadeA = true;
        let hasShadeB = true;
        let hasShadeC = true;
        let hasShadeD = true;
        cube = new Cube(hasShadeA, hasShadeB, hasShadeC, hasShadeD);
    })

    it('should be an object', function(done) {
        expect(cube).to.be.a('object');
        done();
    })

    it('should store initial values without mutation', function(done) {
        expect(cube.hasShadeA).to.be.equal(true);
        expect(cube.hasShadeB).to.be.equal(true);
        expect(cube.hasShadeC).to.be.equal(true);
        expect(cube.hasShadeD).to.be.equal(true);
        expect(cube.colour).to.be.equal("F2F5F6");
        done();
    }) 
})