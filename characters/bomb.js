let fire = require("./fire.js");

class Bomb extends fire{
    getCoordinates(x, y){
        let directions = [
            [x - 2, y + 2],
            [x - 2, y + 1],
            [x - 2, y],
            [x - 2, y - 1],
            [x - 2, y - 2],
            [x - 1, y + 2],
            [x - 1, y + 1],
            [x - 1, y],
            [x - 1, y - 1],
            [x - 1, y - 2],
            [x, y + 2],
            [x, y + 1],
            [x, y],
            [x, y - 1],
            [x, y - 2],
            [x + 1, y + 2],
            [x + 1, y + 1],
            [x + 1, y],
            [x + 1, y - 1],
            [x + 1, y - 2],
            [x + 2, y + 2],
            [x + 2, y + 1],
            [x + 2, y],
            [x + 2, y - 1],
            [x + 2, y - 2]
        ];
        let found = [];
        for (let i in directions) {
            let x = directions[i][0];
            let y = directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    found.push(directions[i]);
            }
        }
        return found;
    }
    explosion(x, y){
        let coordinates = this.getCoordinates(x, y);
        coordinates.forEach(direction => {
            let newX = direction[0]
            let newY = direction[1]
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < waterArr.length; i++) {
                if (waterArr[i].x == newX && waterArr[i].y == newY) {
                    waterArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < fireArr.length; i++) {
                if (fireArr[i].x == newX && fireArr[i].y == newY) {
                    fireArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < foodArr.length; i++) {
                if (foodArr[i].x == x && foodArr[i].y == y) {
                    foodArr.splice(i, 1);
                    break;
                }
            }
            matrix[newY][newX] = 5;
            let newBomb = new Bomb(newX, newY);
            bombArr.push(newBomb);
        });
    }
    eat() {
        function random(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }
        let newCell = random(this.chooseCell(2).concat(this.chooseCell(3)).concat(this.chooseCell(3)).concat(this.chooseCell(1)).concat(this.chooseCell(1)).concat(this.chooseCell(1)).concat(this.chooseCell(1)).concat(this.chooseCell(4)).concat(this.chooseCell(6)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            this.energy++;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 5;
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
            for (let i = 0; i < fireArr.length; i++) {
                if (fireArr[i].x == x && fireArr[i].y == y) {
                    fireArr.splice(i, 1);
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
        if (this.energy > 50) {
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

            this.energy -= 5;
            this.x = x;
            this.y = y;
            matrix[y][x] = 5;

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
            matrix[y][x] = 5;
            let newBomb = new Bomb(x, y);
            bombArr.push(newBomb);
            this.energy = 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < bombArr.length; i++) {
            if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
                bombArr.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = Bomb;