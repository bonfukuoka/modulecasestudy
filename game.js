var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
let imgBrick = new Image();
imgBrick.src = document.getElementById('brick').src;
let imgPaddle = new Image();
imgPaddle.src = document.getElementById('paddle').src;

const SCREEN = {
    SCREEN_HEIGHT: canvas.height,
    SCREEN_WIDTH: canvas.width
}


var paddle = {
    width: 100,
    height: 10,
    x: SCREEN.SCREEN_WIDTH/2 - 50,
    y: canvas.height - 10,
    speed: 10,
    isMovingLeft: false,
    isMovingRight: false
};

var ball = {
    x: SCREEN.SCREEN_WIDTH/2 ,
    y: SCREEN.SCREEN_HEIGHT - paddle.height - 15,
    dx: 5,
    dy: 2,
    radius: 15
};

var Bricks = {
    offsetX: 25,
    offsetY: 25,
    margin: 25,
    width: 70,
    height: 25,
    totalRow: 3,
    totalCol: 5
};
var gameOver = false;
var gameWin = false;
var score = 0;
var maxScore = Bricks.totalRow * Bricks.totalCol;
var BrickList = [];

for (var i = 0; i < Bricks.totalRow; i++) {
    for (var j = 0; j < Bricks.totalCol; j++) {
        BrickList.push({
            x: Bricks.offsetX + j * (Bricks.width + Bricks.margin),
            y: Bricks.offsetY + i * (Bricks.height + Bricks.margin),
            isBroken: false
        });

    }
}
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 37) {
        paddle.isMovingLeft = false;
    } else if (event.keyCode == 39) {
        paddle.isMovingRight = false;
    }
});
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        paddle.isMovingLeft = true;
    } else if (event.keyCode == 39) {
        paddle.isMovingRight = true;
    }
});

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "pink";
    context.fill();
    context.closePath();
}
function drawPaddle() {
    // context.beginPath();
    // context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    // context.fill();
    // context.closePath();
    context.drawImage(imgPaddle ,paddle.x ,paddle.y ,paddle.width ,paddle.height);
}
function drawBricks() {
    BrickList.forEach(function (b) {
        if (!b.isBroken) {
            // context.beginPath();
            // context.rect(b.x, b.y, Bricks.width, Bricks.height);
            // context.fill();
            // context.closePath();
            context.drawImage(imgBrick, b.x, b.y, Bricks.width, Bricks.height);
        }
    });
}
function actionball() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
}
function ballAndPaddle() {
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width &&
        ball.y + ball.radius >= canvas.height - paddle.height) {
        ball.dy = -ball.dy;
    }
}
function ballAnhBricks() {
    BrickList.forEach(function (b) {
        if (!b.isBroken) {
            if (ball.x >= b.x && ball.x <= b.x + Bricks.width && ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + Bricks.height) {
                ball.dy = - ball.dy
                b.isBroken = true;
                score += 1;
                if(score >= maxScore){
                    gameOver = true;
                    gameWin = true;
                }
            }
        }
    });
}
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
function updatePaddle() {
    if (paddle.isMovingLeft) {
        paddle.x -= paddle.speed;
    } else if (paddle.isMovingRight) {
        paddle.x += paddle.speed;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width;
    }
}
function checkGameOver() {
    if (ball.y > canvas.height - ball.radius) {
        gameOver = true;
    }
}
function showGameOver() {
    if(gameWin){
        alert("YOU WIN");
    }else{
        alert("YOU LOSE");
    }
}

function draw() {
    if (!gameOver) {
        context.clearRect(0, 0, 500, 500);
        drawBall();
        drawPaddle();
        drawBricks();
        actionball();
        ballAndPaddle();
        ballAnhBricks();
        updateBall();
        updatePaddle();
        checkGameOver();
        requestAnimationFrame(draw);
    } else {
        showGameOver();
    }
}

draw();
