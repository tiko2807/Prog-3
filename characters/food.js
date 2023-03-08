class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
    }

    chooseCell() {
        let found = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[j][i] == 0) {
                    found.push([j,i]);
                }
            }
        }
        return found;
    }


    spawn() {
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        let newCell = random(this.chooseCell());
        if (this.multiply >= 20 && newCell && foodArr.length <= 40) {
            let x = newCell[0];
            let y = newCell[1];
            let newFood = new Food(x, y);
            foodArr.push(newFood);
            matrix[y][x] = 6;
            this.multiply = 0;
        }
        this.multiply += 2;
    }
}
module.exports = Food;