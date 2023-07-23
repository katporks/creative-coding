'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const Cloud = require('../cloud');
const Cube = require('../cube');

describe ('Cloud tests', () =>  {
    let cloud;
    let randomStub;

    beforeEach(() => {
        cloud = new Cloud(4, 3);
        randomStub = sinon.stub(Math, 'random');
    })

    afterEach(() => {
        randomStub.restore();
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
        randomStub.returns(1);
        let minimumGridXCloud = new Cloud(4, 100);
        expect(minimumGridXCloud.ridgeProbabilities).to.deep.equals([100]);
        expect(minimumGridXCloud._getRandomRidge()).to.equal(1);
        done();
    })

    it('should have 100% probability when gridX floor divided by three equals 1', (done) => {
        let minimumGridXCloud = new Cloud(5, 100);
        expect(minimumGridXCloud.ridgeProbabilities).to.deep.equals([100]);
        done();
    })

    it('should have two different set probabilities when gridX floor divided by three equals 2', (done) => {
        let gridXCloud = new Cloud(8, 50);
        expect(gridXCloud.ridgeProbabilities).to.deep.equals([60, 100]);
        done();
    })

    it('should have three different set probabilities when gridX floor divided by three equals 3', (done) => {
        let gridXCloud = new Cloud(9, 50);
        expect(gridXCloud.ridgeProbabilities).to.deep.equals([60, 84, 100]);
        randomStub.returns(0.6);
        expect(gridXCloud._getRandomRidge()).to.equal(1);
        randomStub.returns(0.84);
        expect(gridXCloud._getRandomRidge()).to.equal(2);
        randomStub.returns(1);
        expect(gridXCloud._getRandomRidge()).to.equal(3);
        done();
    })

    it('should have median as longest cloud row when gridY is less than 6', (done) => {
        let smallCloud = new Cloud(4, 5);
        expect(smallCloud._getLongestCloudRow()).to.equal(2);
        done()
    })

    it('should have random row in the range of the 1/3 and 2/3 of any cloud when grid Y is greater than 5', (done) => {
        let largerCloud = new Cloud(4, 10);
        randomStub.returns(0);
        let lowerBoundThird = Math.floor(largerCloud.gridY/3);
        expect(largerCloud._getLongestCloudRow()).to.equal(lowerBoundThird);
        randomStub.returns(1);
        expect(largerCloud._getLongestCloudRow()).to.equal(lowerBoundThird * 2);
        done()
    })

    it('should return 0 ridge if there are not enough numBlocks', (done) => {
        expect(cloud._getHalfRowMetaData(0)).to.deep.equal({
            "ridge": 0,
            "numBlocks": 0
        });
        
        let stub = sinon.stub(cloud, '_getRandomRidge');
        stub.returns(3);
        expect(cloud._getHalfRowMetaData(3)).to.deep.equal({
            "ridge": 3,
            "numBlocks": 0
        });

        stub.returns(6);
        expect(cloud._getHalfRowMetaData(5)).to.deep.equal({
            "ridge": 0,
            "numBlocks": 5
        });

        stub.returns(2);
        expect(cloud._getHalfRowMetaData(5)).to.deep.equal({
            "ridge": 2,
            "numBlocks": 3
        });        
        stub.restore();
        done()
    })

    it("should return cloud's metadata", function (done) {
        let singleRidgeCloud = new Cloud(5, 4);
        randomStub.returns(1);

        // Expected output for the test case
        const expectedMetadata = {
            '0': { leftRidge: 1, rightRidge: 1, numBlocks: 1 },
            '1': { leftRidge: 1, rightRidge: 1, numBlocks: 3 },
            '2': { leftRidge: 0, rightRidge: 0, numBlocks: 5 },
            '3': { leftRidge: 1, rightRidge: 1, numBlocks: 3 }        };

        // Console log the actual output to compare with expected output
        let metadata = singleRidgeCloud._getEachRowMetaData()
        // Assertion to check if the actual output matches the expected output
        expect(metadata).to.deep.equal(expectedMetadata);
        done()
    });
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