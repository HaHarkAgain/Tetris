window.addEventListener("load", tetris, false);

function tetris() {
    window.addEventListener("keydown", move);
    canv = document.getElementById("tetris");
    ctx = canv.getContext("2d");
    var unit = canv.width / 12;
    var posX = 5;
    var posY = 0;

    var shapeArray = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];

    var currentShape = shapeArray;

    arena = [ // 2 = edge
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
    currentShape = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];

    var shape = 0;
    var down = false;
    var orientation = 0; // 0 = horizontal
    var direction = 0;
    defineShape();
    updateShape();
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
            down = true;
            direction = 1;
            collision();
            down = false;
            posY += direction;
            updateShape();
        }
    }
    function defineShape() {
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
    
    function clearRows() {
        for (y = 19; y > 0; y--) {
            count = 0;
            for (x = 1; x < 11; x++) {
                if (arena[y][x] == 2) {
                    count += 1;
                }
            }
            if (count == 10) {
                for (i = 1; i < 11; i++) {
                    arena[y][i] = 0
                }
                for (j = y; j > 0; j--) {
                    for (k = 1; k < 11; k++) {
                        arena[j][k] = arena [j - 1][k];
                    }
                }
                clearRows();
            }
        }
    }

    function updateShape() {
        for (x = 1; x < 11; x++) {
            for (y = 0; y < 20; y++) {
                if (arena[y][x] == 1) {
                    arena[y][x] = 0;
                }
            }
        }
        currentShape = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
        for (x = 0; x < 4; x++) {
            for (y = 0; y < 4; y++) {
                if (shapeArray[y][x] == 1) {
                    if ((orientation == 0) || (shape == 0)) {
                        arrayX = x;
                        arrayY = y;
                    }
                    else if (orientation == 1) {
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
                    if (shape == 1) {
                        if (orientation == 2) {
                            arrayX += 1;
                        }
                        if (orientation == 3) {
                            arrayY += 1;
                        }
                    }
                    if (arena[posY + arrayY][posX + arrayX] == 2) {
                        orientation = (orientation + 3) % 4;
                        updateShape();
                        break;
                    }
                    else {
                        currentShape[arrayY][arrayX] = 1;
                        arena[posY + arrayY][posX + arrayX] = 1;
                    }
                }
            }
        }
    }
    function collision() {
        for (x = 0; x < 4; x++) {
            for (y = 0; y < 4; y++) {
                if (currentShape[y][x] == 1) {
                    if (down == true) {
                        if (arena[posY + y + 1][posX + x] == 2) {
                            direction = 0;
                            for (x = 1; x < 11; x++) {
                                for (y = 0; y < 20; y++) {
                                    if (arena[y][x] == 1) {
                                        arena[y][x] = 2;
                                    }
                                }
                            }
                            defineShape();
                            break;
                        }   
                    }
                    else if (arena[posY + y][posX + x + direction] == 2) {
                        direction = 0;
                        break;
                    }  
                }
            }
        }
    }
    function draw() {
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);
        
        ctx.fillStyle = "white";
        for (i = 2; i <= 20; i++) {
            ctx.fillRect(i * unit, 0, 1, canv.height); // vertical
            ctx.fillRect(0, (i - 1) * unit, canv.width, 1); // horizontal
        }
        for (y = 0; y < 21; y++) {
            for (x = 0; x < 12; x++) {
                if (arena[y][x] == 1) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(x * unit, y * unit, unit, unit);
                }
                if (arena[y][x] == 2) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(x * unit, y * unit, unit + 1, unit + 1);
                }
            }
        }
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}