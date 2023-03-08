// Imports
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Stats
let charactersCount = {
    maleGrass: 0,
    femaleGrass: 0
}

let weather = {
    0: "winter",
    1: "spring",
    2: "summer",
    3: "autumn"
}
app.use(express.static("."));

app.get("/", (req, res) => {
    res.redirect("index.html");
});

server.listen(3000);

let grass = require("./characters/grass.js");
let grassEater = require("./characters/grassEater.js");
let fire = require("./characters/fire.js");
let water = require("./characters/water.js");
let bomb = require("./characters/bomb.js");
let food = require("./characters/food.js");
let Bomb = new bomb()

matrix = [];
grassArr = [];
grassEaterArr = [];
fireArr = [];
waterArr = [];
bombArr = [];
foodArr = [];


function generateMatrix(dimension, firstCharacter, secondCharacter, thirdCharacter, fourthCharacter, fifthCharacter, sixthCharacter) {
    for (let i = 0; i < dimension; i++) {
        matrix.push([]);
        for (let j = 0; j < dimension; j++) {
            matrix[i].push(0);
        }
    }

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < firstCharacter) {
                matrix[j][i] = 0;
            } else if (a >= (firstCharacter) && a < (firstCharacter + secondCharacter)) {
                matrix[j][i] = 1;
            }
            else if (a >= (firstCharacter + secondCharacter) && a < (secondCharacter + firstCharacter + thirdCharacter)) {
                matrix[j][i] = 2;
            }
            else if (a >= (secondCharacter + firstCharacter + thirdCharacter) && a < (secondCharacter + firstCharacter + thirdCharacter + fourthCharacter)) {
                matrix[i][j] = 3;
            }
            else if (a >= (secondCharacter + firstCharacter + thirdCharacter + fourthCharacter) && a < (secondCharacter + firstCharacter + thirdCharacter + fourthCharacter + fifthCharacter)) {
                matrix[i][j] = 4;
            }
            else if (a >= (secondCharacter + firstCharacter + thirdCharacter + fourthCharacter + fifthCharacter) && a < (secondCharacter + firstCharacter + thirdCharacter + fourthCharacter + fifthCharacter + sixthCharacter)) {
                matrix[i][j] = 6;
            }
        }
    }
    io.emit('send matrix', matrix);
}

function createObject() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const current = matrix[y][x];
            if (current === 1) {
                grassArr.push(new grass(x, y));
            }
            else if (current === 2) {
                grassEaterArr.push(new grassEater(x, y));
            }
            else if (current === 3) {
                waterArr.push(new water(x, y));
            } else if (current === 4) {
                fireArr.push(new fire(x, y));
            }
            else if (current === 6) {
                foodArr.push(new food(x, y));
            }
        }
    }
}

function gameMove() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
        grassArr[i].fastMultiply();
        if (grassArr[i].gender == 1)
            charactersCount["maleGrass"]++;
        else
            charactersCount["femaleGrass"]++;
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < waterArr.length; i++) {
        waterArr[i].mul();
    }
    for (let i = 0; i < fireArr.length; i++) {
        fireArr[i].eat();
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].eat();
    }
    for (let i = 0; i < foodArr.length; i++) {
        foodArr[i].spawn();
    }
    io.emit("send matrix", matrix);
}

generateMatrix(30, 50, 15, 10, 15, 5, 5);
createObject();


io.on("connection", (socket) => {
    socket.on("bomb cell", (data) => {
        Bomb.explosion(data["y"], data["x"]);
    });
});

let count = 0;
let epoch = 0;
let weatherCounter = 0;
var time = 1000 / 5;
(function loop() {
    setTimeout(function () {
        gameMove();
        if (count == 60) {
            count = 0
            if (epoch % 5 == 0) {
                var fs = require('fs');
                fs.appendFile("stats.json", epoch + ": " + JSON.stringify(charactersCount) + ",\n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            epoch++;
        }
        if (count % 20 == 0) {
            if (weatherCounter == 4) {
                weatherCounter = 0;
            }
            io.emit("send weather", weather[weatherCounter]);
            weatherCounter++;
        }
        count++;
        loop();
    }, time);
})();

module.exports = charactersCount;