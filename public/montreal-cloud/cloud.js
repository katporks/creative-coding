const minGridX = 4;
const minGridY = 3;
const minRidge = 1;
const rollingProbability = 0.6;
const minGridYLengthForRandomCenter = 6
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
                if (randomProbability <= probability) {
                  ridge = index + 1;
                  return ridge;
                }
              }
            
            return ridge;  
        }

        this._getLongestCloudRow = function() {
            if (gridY < minGridYLengthForRandomCenter) {
                return Math.floor(gridY/2)
            }
            let lowerBound = Math.floor(gridY/3);
            let upperBound = lowerBound * 2;
            let randomRow = Math.floor(
                Math.random() * (upperBound - lowerBound) + lowerBound
            );
            return randomRow;
        }

        this._getNumHalfRidgeBlocks = function (numBlocks) {
            let halfRidge = this._getRandomRidge();
            let newNumBlocks = numBlocks - halfRidge;
            if (newNumBlocks <= 0) {
               return 0;
            } 
            return halfRidge;
        }

        this._getEachRowMetaData = function (current_index, rowMetaData, difference) {  
            let numBlocks = rowMetaData[current_index]["numBlocks"];
            let leftRidge = this._getNumHalfRidgeBlocks();
            let rightRidge = this._getNumHalfRidgeBlocks();
            let afterLeftRidgeNumBlocks = numBlocks - leftRidge;
            let afterRightRidgeNumBlocks = numBlocks - rightRidge;

            if (current_index < 0 || afterLeftRidgeNumBlocks + afterRightRidgeNumBlocks == 0) {
                return rowMetaData;
            }

            rowMetaData["leftRidge"] = leftRidge;
            rowMetaData["rightRidge"] = rightRidge;
            rowMetaData["numBlocks"] = numBlocks - leftRidge - rightRidge;

            this._getEachRowMetaData(current_index + difference, rowMetaData, difference);
        }

        this._getMetaData = function() {
            let centerRow = this._getLongestCloudRow();
            let allMetaData = {};
            
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

module.exports = Cloud;