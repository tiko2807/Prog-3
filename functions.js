function createTable(tableSize, width, height) {
    let gamingTable = document.createElement("div");
    gamingTable.id = "gaming-table";
    document.body.insertBefore(gamingTable, document.body.firstChild);

    for (let i = 0; i < tableSize; i++) {
        let newRow = document.createElement("div");
        newRow.className = "row-" + (i + 1);
        // newRow.style.width = "10px";
        newRow.style.height = height + "px";
        for (let j = 0; j < tableSize; j++) {
            let newCell = document.createElement("div");
            newCell.className = "cell";
            newCell.dataset.x = j;
            newCell.dataset.y = i;
            newCell.style.backgroundColor = "gray";
            newCell.style.width = width + "px";
            newCell.style.height = height + "px";
            newCell.style.display = "inline-block";
            newCell.style.border = "1px solid black";
            newCell.dataset.character = "0";
            newRow.appendChild(newCell);
        }
        gamingTable.appendChild(newRow);
    }
}

function updateTable(matrix) {
    children = document.getElementById("gaming-table").children;
    let colors = {}
    if (weather == "winter") {
        colors = {
            0: "gray",
            1: "#F5F5F5",
            2: "#F99417",
            3: "#5D3891",
            4: "#7286D3",
            5: "black"
        }
    }
    else if (weather == "spring") {
        colors = {
            0: "gray",
            1: "#DFFFD8",
            2: "#F7C8E0",
            3: "#B4E4FF",
            4: "#865DFF",
            5: "#191825"
        }
    }
    else if (weather == "summer") {
        colors = {
            0: "gray",
            1: "green",
            2: "yellow",
            3: "blue",
            4: "red",
            5: "black"
        }
    }
    else if (weather == "autumn") {
        colors = {
            0: "gray",
            1: "#FFB26B",
            2: "#FFB26B",
            3: "#FFD56F",
            4: "#939B62",
            5: "black"
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            let characterType = matrix[j][i];
            children[i].children[j].style.backgroundColor = colors[characterType];
        }
    }
}