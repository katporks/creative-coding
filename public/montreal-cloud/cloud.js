const minGridX = 4;
const minGridY = 3;
const minRidge = 1;
const rollingProbability = 0.68;
const minGridYLengthForRandomCenter = 6
const xOutOfBoundsErrorMsg = `Cloud.gridX must be greater than or equal to ${minGridX}`;
const yOutOfBoundsErrorMsg = `Cloud.gridY must be greater than or equal to ${minGridY}`;

class Cloud {
    constructor(gridX, gridY) {
        this._gridX = null;
        this._gridY = null;
        this._maxRidge = null;
        this._centralIndex = null;     
        this._matrix = null;
        this._minRidge = minRidge;
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
            // let centralIndex = this._getLongestCloudRow();
            let upperBlocks = gridX;
            let lowerBlocks = gridX;
            let metadata = {}

            for (let i = this.centralIndex-1; i >= 0; i--) {
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

            metadata[this.centralIndex] = {
                "leftRidge": 0,
                "rightRidge": 0,
                "numBlocks": gridX
            }

            for (let i = this.centralIndex+1; i < gridY; i++) {
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

        this.createMatrix = () => {
            let metadata = this._getEachRowMetaData()
            // console.log(metadata)
            let matrix = Array(gridY).fill().map(() => Array(gridX).fill(false));
            let leftStart = 0;
            let rightStart = gridX - 1; 
            // console.log("leftStart", leftStart);
            // console.log("rightStart", rightStart);
            matrix[this.centralIndex].fill(true);
            // console.log("metadata")
            for (let i=this.centralIndex-1; i >= 0; i--) {
                leftStart += metadata[i]["leftRidge"];
                // console.log("i", i)
                // console.log("leftStart", leftStart);
                rightStart -= metadata[i]["rightRidge"];
                // console.log("rightStart", rightStart);
                for (let j=leftStart; j<=rightStart; j++) {
                    if (i == 0 && j == leftStart) {
                        this.cloudStartIndex = (i, j);
                    }
                    matrix[i][j] = true;
                }
            }
            leftStart = 0;
            rightStart = gridX - 1; 

            for (let i=this.centralIndex+1; i < gridY; i++) {
                leftStart += metadata[i]["leftRidge"];
                // console.log("i", i)
                // console.log("leftStart", leftStart);
                rightStart -= metadata[i]["rightRidge"];
                // console.log("rightStart", rightStart);
                for (let j=leftStart; j<=rightStart; j++) {
                    matrix[i][j] = true;
                }
            }

            return matrix;
        }

        this._createCloud = () => {
            let matrix = this.createMatrix;
            let cloud = Array(gridY).fill().map(() => Array(gridX).fill(null));
            cloud[this.cloudStartIndex[0], this.cloudStartIndex[1]] = new Cube(false, true, true, false);

            // dfs to generate cloud patterns
            
        }

        this.gridX = gridX;
        this.gridY = gridY;
        this.metadata = this._getEachRowMetaData();
        this.ridgeProbabilities = this._getRidgeProbabilties();
        this.centralIndex = this._getLongestCloudRow();
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