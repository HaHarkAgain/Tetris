window.addEventListener("load", tetris, false);

function tetris() {
    window.addEventListener("keydown", move);
    canv = document.getElementById("tetris");
    ctx = canv.getContext("2d");
    var unit = canv.width / 10;
    var posX = 5;
    var posY = 0;
    var shapeArray = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    var arena = [ // 1 = edge, 2 = bottom
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
    ]
    var shape = 0;
    var orientation = 0; // 0 = horizontal
    defineShape();
    function move(evt) {
        if (evt.keyCode == 37) { // left
            posX--;
        }
        if (evt.keyCode == 38) { // up
            orientation = (orientation + 1) % 4;
        }
        if (evt.keyCode == 39) { // right
            posX++;
        }
        if(evt.keyCode == 40) { // down
            posY++;
        }
        if(evt.keyCode == 32) { // space 
            orientation = (orientation + 3) % 4;
        }
    }
    function defineShape() {
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
    }
    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);
        
        ctx.fillStyle = "white";
        for (i = 1; i <= 20; i++) {
            ctx.fillRect(i * unit, 0, 2, canv.height);
            ctx.fillRect(0, i * unit, canv.width, 2);
        }
        currentUnit = 0;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                if (shapeArray[i][j] == 1) {
                    if ((orientation == 0) || (shape == 0)) {
                        x = j;
                        y = i;
                    }
                    else if (orientation == 1) {
                        x = -i + 2;
                        y = j;
                    }
                    else if (orientation == 2) {
                        x = -j + 2;
                        y = -i + 2;
                    }
                    else if (orientation == 3) {
                        x = i;
                        y = -j + 2;
                    }
                    ctx.fillRect((posX + x) * unit, (posY + y) * unit, unit, unit);
                }
            }
        }
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}