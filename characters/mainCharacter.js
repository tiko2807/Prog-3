class mainCharacter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        // 0 - female
        // 1 - male
        this.gender = Math.round(Math.random());
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    multipy() {
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 7 && newCell) {
            let x = newCell[0];
            let y = newCell[1];
            let newCharacter = new mainCharacter(x, y);
            character.push(newCharacter);
            matrix[y][x] = 1;
            this.multiply = 0;
        }
        this.multiply += 3;
    }

}
module.exports = mainCharacter;