let mainCharacter = require("./mainCharacter.js");

class Grass extends mainCharacter{
    constructor(x, y) {
        super(x, y)
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    mul() {
        function random(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }
        let newCell = random(this.chooseCell(0));
        if(this.chooseCell(1).length > 0){
            let otherGrass = random(this.chooseCell(1));
            if (this.multiply >= 5 && newCell && otherGrass.gender != this.gender) {
                let x = newCell[0];
                let y = newCell[1];
                let newGrass = new Grass(x, y);
                grassArr.push(newGrass);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
        this.multiply += 3;
    }
    fastMultiply() {
        function random(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }
        let newCell = random(this.chooseCell(3));
        if (newCell) {
            this.multiply += 5;
        }
    }
}
module.exports = Grass;