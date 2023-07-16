'use strict';

const expect = require('chai').expect;

const Cloud = require('../cloud');
const Cube = require('../cube');

describe ('Cloud tests', function() {
    let cloud;

    this.beforeEach(function() {
        cloud = new Cloud();
    })

    it('should be an object', function(done) {
        expect(cloud).to.be.a('object');
        done();
    })
})

describe ('Cube tests', function() {
    let cube;

    this.beforeEach(function() {
        cube = new Cube();
    })

    it('should be an object', function(done) {
        expect(cube).to.be.a('object');
        done();
    })
})