'use strict';

const expect = require('chai').expect;

const Cloud = require('../cloud');
const Cube = require('../cube');

describe ('Cloud tests', () =>  {
    let cloud;

    beforeEach(() => {
        cloud = new Cloud(4, 3);
    })

    it('should be an object with int gridX >= 4 and int gridY >= 3', (done) =>  {
        expect(cloud).to.be.a('object');
        expect(cloud.gridX).to.be.a('number');
        expect(cloud.gridY).to.be.a('number');
        expect(cloud._minRidge).to.be.equals(1);
        expect(cloud._maxRidge).to.be.equals(1);
        done();
    })

    it('should throw an error when gridX is less than the minimum', (done) => {
        expect(() => {new Cloud(3, 4)}).to.throw(Error, 'Cloud.gridX must be greater than or equal to 4');
        done();
    })

    it('should throw an error when gridY is less than the minimum', (done) => {
        expect(() => {new Cloud(4, 2)}).to.throw(Error, 'Cloud.gridY must be greater than or equal to 3');
        done();
    })

    it('should make gridX floored integers if input flots', (done) => {
        let floatCloud = new Cloud(4.2, 3.3);
        expect(floatCloud.gridX).to.be.equals(4);
        expect(floatCloud.gridY).to.be.equals(3);
        done();
    })

    it('should have cloud._maxRidge floor divide any number by 3', (done) => {
        let floatCloud = new Cloud(12.16, 3);
        expect(floatCloud._maxRidge).to.be.equals(4);
        done();
    })

    it('should have 100% probability when gridX equals 1', (done) => {
        let minimumGridXCloud = new Cloud(4, 100);
        expect(minimumGridXCloud.ridgeProbabilities).to.deep.equals([100]);
        done();
    })

    it('should have 100% probability when gridX floor divided by three equals 1', (done) => {
        let minimumGridXCloud = new Cloud(5, 100);
        expect(minimumGridXCloud.ridgeProbabilities).to.deep.equals([100]);
        done();
    })

    it('should have two different set probabilities when gridX floor divided by three equals 2', (done) => {
        let gridXCloud = new Cloud(8, 50);
        expect(gridXCloud.ridgeProbabilities).to.deep.equals([60, 40]);
        done();
    })

    it('should have three different set probabilities when gridX floor divided by three equals 3', (done) => {
        let gridXCloud = new Cloud(9, 50);
        expect(gridXCloud.ridgeProbabilities).to.deep.equals([60, 84, 16]);
        done();
    })
})

describe ('Cube tests', () =>  {
    let cube;

    beforeEach(() => {
        let hasShadeA = true;
        let hasShadeB = true;
        let hasShadeC = true;
        let hasShadeD = true;
        cube = new Cube(hasShadeA, hasShadeB, hasShadeC, hasShadeD);
    })

    it('should be an object with booleans and a string', (done) =>  {
        expect(cube).to.be.a('object');
        expect(cube.hasShadeA).to.be.a('boolean');
        expect(cube.hasShadeB).to.be.a('boolean');
        expect(cube.hasShadeC).to.be.a('boolean');
        expect(cube.hasShadeD).to.be.a('boolean');
        expect(cube.colour).to.be.a('string');
        done();
    })

    it('should store initial values without mutation', (done) =>  {
        expect(cube.hasShadeA).to.be.equals(true);
        expect(cube.hasShadeB).to.be.equals(true);
        expect(cube.hasShadeC).to.be.equals(true);
        expect(cube.hasShadeD).to.be.equals(true);
        expect(cube.colour).to.be.equals("F2F5F6");
        done();
    }) 
})