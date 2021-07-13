document.addEventListener("mousemove" , mouseMoveHandler , false);
function mouseMoveHandler(e){
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > paddleWidth && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth;
        }
    }
