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
        this._getRidgeProbabilties = () => {
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

        this._getRandomRidge = () => {
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

        this._getLongestCloudRow = () => {
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

        this._getHalfRowMetaData = (numBlocks) => {
            let halfMetadata = {}
            let halfRidge = this._getRandomRidge()
            let newNumBlocks = numBlocks - halfRidge;
            if (newNumBlocks == 0) {
                halfMetadata["ridge"] = halfRidge;
                halfMetadata["numBlocks"] = 0;
            } else if (newNumBlocks < 0) {
                halfMetadata["ridge"] = 0,
                halfMetadata["numBlocks"] = numBlocks
            } else {
                halfMetadata["ridge"] = halfRidge
                halfMetadata["numBlocks"] = newNumBlocks
            }
            return halfMetadata;
        }


        this._getEachRowMetaData = () => {  
            let centralIndex = this._getLongestCloudRow();
            let upperBlocks = gridX;
            let lowerBlocks = gridX;
            let metadata = {}

            for (let i = centralIndex-1; i >= 0; i--) {
                // TODO: abstract this into helper function, implement coin toss random between left and right
                let leftRidge = this._getHalfRowMetaData(upperBlocks);
                upperBlocks = leftRidge["numBlocks"];
                let rightRidge = this._getHalfRowMetaData(upperBlocks);
                upperBlocks = rightRidge["numBlocks"];
    
                metadata[i] = {
                    "leftRidge":  leftRidge["ridge"],
                    "rightRidge": rightRidge["ridge"],
                    "numBlocks": upperBlocks
                }
            }
            metadata[centralIndex] = {
                "leftRidge": 0,
                "rightRidge": 0,
                "numBlocks": gridX
            }
            for (let i = centralIndex+1; i < gridY; i++) {
                let leftRidge = this._getHalfRowMetaData(lowerBlocks);
                lowerBlocks = leftRidge["numBlocks"];
                let rightRidge = this._getHalfRowMetaData(lowerBlocks);
                lowerBlocks = rightRidge["numBlocks"];
    
                metadata[i] = {
                    "leftRidge":  leftRidge["ridge"],
                    "rightRidge": rightRidge["ridge"],
                    "numBlocks": lowerBlocks
                }
            }

            return metadata
        }

        this._getMetaData = () => {
            
            
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

let singleRidgeCloud = new Cloud(5, 4);
let upperHalf = singleRidgeCloud._getEachRowMetaData();
console.log(upperHalf)
module.exports = Cloud;