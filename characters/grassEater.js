let mainCharacter = require("./mainCharacter.js");

class grassEater extends mainCharacter {
    constructor(x, y) {
        super(x, y)
        this.energy = 2;
        this.directions = [];
    }
    getNewCoordinates() {
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
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[y][x] == character) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    eat() {
        function random(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }
        let newCell = random(this.chooseCell(1).concat(this.chooseCell(6)).concat(this.chooseCell(6)).concat(this.chooseCell(6)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            this.energy++;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 2;
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < foodArr.length; i++) {
                if (foodArr[i].x == x && foodArr[i].y == y) {
                    foodArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
        if (this.energy > 8) {
            this.mul();
        }
    }
    move() {
        function random(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            let x = newCell[0];
            let y = newCell[1];

            this.energy--;
            this.x = x;
            this.y = y;
            matrix[y][x] = 2;

            if (this.energy < 0) {
                this.die();
            }
        }
    }
    mul() {
        function random(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }
        let newCell = random(this.chooseCell(0));                
        let x = newCell[0];
        let y = newCell[1];
        matrix[y][x] = 2;
        if (newCell) {
            let newGrassEater = new grassEater(x, y);
            grassEaterArr.push(newGrassEater);
            this.energy = 2;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);                                
                break;
            }
        }
    }
}
module.exports = grassEater;