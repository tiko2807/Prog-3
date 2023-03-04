let mainCharacter = require("./mainCharacter.js");
class Water extends mainCharacter {
    constructor(x, y) {
        super(x, y)
        this.multiply = 0;
        this.directions = [
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y + 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y - 2],
            [this.x, this.y + 2],
            [this.x, this.y + 1],
            [this.x, this.y],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x + 1, this.y + 2],
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y - 2]
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
        if (this.multiply >= 25 && newCell && waterArr.length < 60) {
            let x = newCell[0];
            let y = newCell[1];
            let newWater = new Water(x, y);
            waterArr.push(newWater);
            matrix[y][x] = 3;
            this.multiply = 0;
        }
        this.multiply++;
    }
}
module.exports = Water;