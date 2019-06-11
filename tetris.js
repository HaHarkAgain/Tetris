window.addEventListener("load", tetris, false);
function tetris() {
    window.addEventListener("keydown", move);
    canv = document.getElementById("tetris");
    ctx = canv.getContext("2d");
    var unit = canv.width / 12;
    var shapeArray = [];
    var orientation = 0; // 0 = horizontal
    var playing = false;
    var score = 0;
    var lose = false;
    function reset() {
        score = 0;
        playing = true;
        shapeArray = [];
        orientation = 0;
        arena = [ // drawn arena
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        ];
        defineShape();
        posY += 1;
        updateShape();
        fps = setInterval(function(){
            if (playing) {
                lockCheck();
                posY += 1;
                updateShape();
            }
        }, 1000);
    }
    function move(evt) {
        if (evt.keyCode == 37) { // left
            direction = -1;
            collision();
            posX += direction;
            updateShape();
        }
        if (evt.keyCode == 38) { // up
            orientation = (orientation + 1) % 4;
            updateShape();
        }
        if (evt.keyCode == 39) { // right
            direction = 1;
            collision();
            posX += direction;
            updateShape();
        }
        if (evt.keyCode == 40) { // down
            direction = 1;
            lockCheck();
            posY += direction;
            updateShape();
        }
        if (evt.keyCode == 32) { // space
            if (playing) {
                locked = false;
                while (locked == false) {
                    lockCheck();
                    posY += 1;
                    updateShape();
                } 
            }
            else {
                reset();
            }
        }
    }
    function defineShape() { // runs when new shape is called for, place to improve abstraction
        posX = 5;
        posY = 0;
        let square = [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let bar = [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let LShape = [
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let rLShape = [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let stair = [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let rStair = [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let TShape = [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        shape = Math.floor(Math.random() * 7);
        if (shape == 0) {   
            shapeArray = square;
        }
        if (shape == 1) {
            shapeArray = bar;
        }
        if (shape == 2) {
            shapeArray = LShape;
        }
        if (shape == 3) {
            shapeArray = rLShape;
        }
        if (shape == 4) {
            shapeArray = stair;
        }
        if (shape == 5) {
            shapeArray = rStair;
        }
        if (shape == 6) {
            shapeArray = TShape;
        }
        clearRows();
    }
    function clearRows() { // runs when a new shape is called
        for (y = 19; y > 1; y--) {
            count = 0;
            for (x = 1; x < 11; x++) { // checks if there is a full row
                if (arena[y][x] == 2) {
                    count += 1;
                }
            }
            if (count == 10) { 
                for (i = 1; i < 11; i++) { // clears when a full row
                    arena[y][i] = 0
                }
                for (j = y; j > 0; j--) { // moves everything down
                    for (k = 1; k < 11; k++) {
                        arena[j][k] = arena [j - 1][k];
                    }
                }
                score += 500;
                clearRows(); // repeats for if there are multiple full rows
            }
        }
    }
    function updateShape() { // runs to update positioning and rotation of shape
        for (x = 1; x < 11; x++) {
            for (y = 0; y < 20; y++) {
                if (arena[y][x] == 1) {
                    arena[y][x] = 0;
                }
            }
        }
        currentShape = [ // resets currentShape
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        for (x = 0; x < 4; x++) { // rotation
            for (y = 0; y < 4; y++) {
                if (shapeArray[y][x] == 1) { // turns array into a coordinate grid with origin in the middle
                    if ((orientation == 0) || (shape == 0)) { // doesnt rotate if it is a square
                        arrayX = x;
                        arrayY = y;
                    }
                    else if (orientation == 1) { // puts points in different quadrants for each rotation
                        arrayX = -y + 2;
                        arrayY = x;
                    }
                    else if (orientation == 2) {
                        arrayX = -x + 2;
                        arrayY = -y + 2;
                    }
                    else if (orientation == 3) {
                        arrayX = y;
                        arrayY = -x + 2;
                    }
                    if ((shape == 1) && (orientation == 3)) { // exception for the bar, otherwise it is rotated outside of its array range
                        arrayY += 1;
                        arrayX -= 1;
                    }
                    if (arena[posY + arrayY][posX + arrayX] == 2) { // check if rotating the shape moved it into a wall
                        orientation = (orientation + 3) % 4;
                        updateShape();
                        break;
                    }
                    else {
                        currentShape[arrayY][arrayX] = 1; // finalizes rotation of the shape
                        arena[posY + arrayY][posX + arrayX] = 1; // adds shape to the drawn arena
                    }
                }
            }
        }
    }
    function lockCheck() { // bottom collision, runs when moves down
        for (x = 0; x < 4; x++) {
            for (y = 0; y < 4; y++) {
                if (currentShape[y][x] == 1) {
                    if (arena[posY + y + 1][posX + x] == 2) { 
                        direction = 0;
                        for (x = 1; x < 11; x++) { // adds the current shape to the walls
                            for (y = 0; y < 20; y++) {
                                if (arena[y][x] == 1) {
                                    arena[y][x] = 2;
                                }
                            }
                        }
                        if (posY == 1) {
                            lose = true;
                            playing = false;
                        }
                        locked = true;
                        defineShape();
                        break;
                    }
                }
            }
        }
    }
    function collision() { // runs whenever a piece moves
        for (x = 0; x < 4; x++) {
            for (y = 0; y < 4; y++) {
                if (currentShape[y][x] == 1) {
                    if (arena[posY + y][posX + x + direction] == 2) { // check for side collision
                        direction = 0;
                        break;
                    }  
                }
            }
        }
    }
    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height); // backdrop
        if (playing) {
            ctx.fillStyle = "white";
            for (i = 2; i <= 20; i++) {
                ctx.fillRect(i * unit, 0, 1, canv.height); // vertical lines
                ctx.fillRect(0, (i - 1) * unit, canv.width, 1); // horizontal lines
            }
            for (y = 0; y < 21; y++) {
                for (x = 0; x < 12; x++) {
                    if (arena[y][x] == 1) { // current shape
                        ctx.fillStyle = "aqua";
                        ctx.fillRect(x * unit, y * unit, unit + 1, unit + 1);
                    }
                    if (arena[y][x] == 2) { // locked in shapes and walls
                        ctx.fillStyle = "green";
                        ctx.fillRect(x * unit, y * unit, unit + 1, unit + 1);
                    }
                }
            }
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Score: " + score, canv.width / 2, 4 * unit);
            
        }
        if ((playing == false) && (lose == false)) {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Press "space" to start!', canv.width / 2, canv.height / 2);
        }
        if (lose) {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Refresh the page to restart', canv.width / 2, canv.height / 2);
            ctx.fillText("Score: " + score, canv.width / 2, 4 * unit);
        }
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}