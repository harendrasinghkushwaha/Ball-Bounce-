var canvas = document.getElementById("cnv");
var pen = canvas.getContext("2d");
var x = (Math.floor((Math.random() * 540) + 60));
var dx = 2
var y = canvas.height-20;
var dy = -3;
var ballRadius = 20;
var i = 0;
var color = ["red","yellow","green","blue","black","orange","blueviolet","maroon","lime"];
var paddleHeight = 18;
var paddleWidth = 120;
var paddleX = (canvas.width - paddleWidth)/2
var rightKeyPressed = false;
var laftKeyPressed = false;
var score = 0;

    var brickRowCount = 3;
    var brickColumnCount = 6;
    var brickWidth = 80;
    var brickHeight = 20;
    var brickPadding = 18;
    var brickOffsetTop = 40;
    var brickOffsetLeft = 18;
    var bricks = [];
    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status:1 };
        }
    }

function drawBall(){
    
    pen.beginPath();
    pen.arc(x,y,ballRadius,0,Math.PI*2);
    pen.fillStyle = color[i];
    pen.fill();
    pen.closePath();
   
}


function drawPaddle(){
    pen.beginPath();
    pen.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    pen.fillStyle = "#0095DD";
    pen.fill();
    pen.closePath();
}

function drawBricks(){
for(c = 0; c < brickColumnCount; c++) {
    for(r=0; r < brickRowCount; r++) {
        if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        pen.beginPath();
        pen.rect(brickX, brickY, brickWidth, brickHeight);
        pen.fillStyle = "#0095DD";
        pen.fill();
        pen.closePath();
        }
    }
}
}

function drawScore(){
    pen.font = "16px Arial";
    pen.fillStyle = "#0095DD";
    pen.fillText("score: "+score, 8, 20);

}

function collisionDetection(){
    for(var c=0;c<brickColumnCount;c++){
        for(var r=0;r<brickRowCount;r++){
            var b = bricks[c][r];
            if(b.status == 1){
            if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y +brickHeight){
                dy = -dy;
                b.status = 0;
                score++;
               i=Math.floor((Math.random() * 8) + 1);
                if(score == brickRowCount*brickColumnCount){
                    alert("YOU WIN, CONGRATULATION!");
                    Document.location.reload();
                }

             }
            }
        }
    }
}




function keyDownHandler(e){
    if(e.keyCode == 39){
        rightKeyPressed = true;
    }
    else if(e.keyCode == 37){
        laftKeyPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightKeyPressed = false;
    }
    else if(e.keyCode == 37){
        laftKeyPressed = false;
    }
}


function move(){

    pen.clearRect(0,0,canvas.width,canvas.height); 
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if(rightKeyPressed){
        if(paddleX+120<canvas.width){
        paddleX += 6;
        }
    }
    else if(laftKeyPressed){
        if(paddleX-6>0){
        paddleX -= 6;
        }
    }
    

    if(x+dx >canvas.width-ballRadius || x + dx<ballRadius){
        dx = -dx;
        i=Math.floor((Math.random() * 8) + 1);
    }
    if(y+dy < ballRadius){
        dy = -dy;
        i=Math.floor((Math.random() * 8) + 1);
        }else if(y + dy > canvas.height-ballRadius){
            if(x>paddleX && x<paddleX+paddleWidth){
                dy = -dy;
        }else {
             alert("GAME OVER");
             document.location.reload();
              }
            }

    x += dx;
    y += dy;

}
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);
setInterval(move, 10);

