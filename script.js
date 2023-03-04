// Config
const dimension = 30;
const side = 10;
const frameRate = 5;
let socket = io();
let weather = "summer";

createTable(dimension, side, side);

let cell = document.getElementsByClassName("cell");
// document.getElementById("bomb-btn").addEventListener("click", function () {
//     socket.emit("bomb cell", { x: Math.round(Math.random() * dimension - 1), y: Math.round(Math.random() * dimension - 1) });
// })

// document.getElementById("gaming-table").children.forEach(element => {    
//     element.children.forEach(div => {
//         div.getElementById("bomb-btn").addEventListener("click", function () {
//             socket.emit("bomb cell", { x: div.dataset.x, y: div.dataset.y });
//         })
//     })
// });

for (let i = 0; i < cell.length; i++) {
    const element = cell[i];
    element.addEventListener("click", function () {
        socket.emit("bomb cell", { x: element.dataset.x, y: element.dataset.y });
    })
}



var time = 1000 / frameRate;
(function loop() {
    setTimeout(function () {
        socket.on('send matrix', function (matrix) {
            updateTable(matrix);
        });
        
        loop();
    }, time);
})();

socket.on('send weather', function (wea) {
    weather = wea;
    document.getElementById("weather-indicator").innerText = wea.charAt(0).toUpperCase() + wea.slice(1);
});

// // Testing table updating
// for (let j = 0; j < 10; j++) {
//     let children = document.getElementById("gaming-table").children;

//     for (let i = 0; i < 10; i++) {
//         var item = children[Math.floor(Math.random() * children.length)];
//         item.children[Math.floor(Math.random() * item.children.length)].dataset.character = Math.floor(Math.random() * 5)
//         console.log(item);
//     }
//     updateTable(document.getElementById("gaming-table"));
// }