let mainCharacter = require("./mainCharacter.js");
class Fire extends mainCharacter{
    constructor(x,y){
        super(x, y);
        this.energy = 10;
    }
    eat() {
        function random(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }
        let newCell = random(this.chooseCell(2).concat(this.chooseCell(3)).concat(this.chooseCell(3)).concat(this.chooseCell(1)).concat(this.chooseCell(1)).concat(this.chooseCell(1)).concat(this.chooseCell(1)).concat(this.chooseCell(6)).concat(this.chooseCell(6)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            this.energy++;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < waterArr.length; i++) {
                if (waterArr[i].x == x && waterArr[i].y == y) {
                    waterArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
        if (this.energy > 25) {
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

            this.energy -= 2;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;

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
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let newFire = new Fire(x, y);
            fireArr.push(newFire);
            this.energy = 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < fireArr.length; i++) {
            if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                fireArr.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = Fire;