const minGridX = 4;
const minGridY = 3;
const minRidge = 1;
const rollingProbability = 0.6;
const xOutOfBoundsErrorMsg = `Cloud.gridX must be greater than or equal to ${minGridX}`;
const yOutOfBoundsErrorMsg = `Cloud.gridY must be greater than or equal to ${minGridY}`;

class Cloud {
    constructor(gridX, gridY) {
        this._gridX = null;
        this._gridY = null;
        this._maxRidge = null;
        this._minRidge = minRidge
        this._rowMetaData = [];       
        this._getRidgeProbabilties = function() {
            let currentProbability = 100;
            let bucketEnd = 0;
            let probabilityBucketEnds = []

            for (let i = minRidge; i < this._maxRidge; i++) {
                let bucketProbability = currentProbability * rollingProbability; 
                bucketEnd += bucketProbability;
                probabilityBucketEnds.push(bucketEnd);
                
                currentProbability  -= bucketProbability; 
            }
            probabilityBucketEnds.push(100);
            return probabilityBucketEnds;
        };

        this._getRandomRidge = function() {
            let randomProbability = Math.floor(Math.random() * 100);
            let ridge = 0;
            let probabilities = this._getRidgeProbabilties();
            for (let index = 0; index < probabilities.length; index++) {
                const probability = probabilities[index];
                console.log("randomProbability", randomProbability);
                console.log("probability", probability);
                if (randomProbability <= probability) {
                  ridge = index + 1;
                  return ridge;
                }
              }
            
            return ridge;  
        }
        this._getRowMetaData = function() {
            let allMetaData = [];

        }

        this.gridX = gridX;
        this.gridY = gridY;
        this.ridgeProbabilities = this._getRidgeProbabilties();
        
    }

    get gridX() {
        return this._gridX;
    }

    set gridX(value) {
        if (value >= minGridX) {
            this._gridX = Math.floor(value);
            this._maxRidge = Math.floor(value / 3); 
        } else {
            throw new Error(xOutOfBoundsErrorMsg);
        }
    }

    get gridY() {
        return this._gridY;
    }

    set gridY(value) {
        if (value >= minGridY) {
            this._gridY = Math.floor(value);
        } else {
            throw new Error(yOutOfBoundsErrorMsg);
        }
    }
}

let testCloud = new Cloud(4, 100);
let result = testCloud._getRandomRidge();
console.log(result)
module.exports = Cloud;