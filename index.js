function startGame(){
    alert("This game was made in Sololearn by MSN(Mohammad Saadman Nuheen).");
    alert("tap on the left and right side of the screen to move the paddle!\nTap and hold to make the paddle move faster.");
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");
    var scrW = window.innerWidth-10 , scrH = window.innerHeight;
    c.width = scrW;
    c.height = scrH - 50;
    var w=c.width, h=c.height;
    var score = 0;
    var bx = w/2,by = h/2+30,bdx = 1.5,bdy = -1.5;
    var diff = prompt("Difficulty?\n(1)Easy\n(2)Normal\n(3)Hard","2");
    if (diff == 1){
        bdx = 1;
        bdy = -1;
    }
    else if (diff == 3){
        bdx = 2;
        bdy = -2;
    }
    var radius = 5;
    var lives = 5;
    function drawLives() {
     ctx.font = "16px Courier";
     ctx.fillStyle = "white";
     ctx.fillText("Lives: "+lives, w-100, 15);
    }
    function drawBall(){
        ctx.beginPath();
        ctx.arc(bx,by,radius,0,Math.PI*2);
        ctx.fillStyle = "#11ff33";
        ctx.fill();
        ctx.closePath();
    }
    function drawScore(){
        ctx.font = "16px Courier";
        ctx.fillStyle = "white";
        ctx.fillText("Score:"+score,10,15);
    }
    var px=w/2+10,py=h-20,pdx=5;
    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(px,py,60,30);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = w/6;
    var brickHeight = 20;
    var brickPadding = 5;
    var brickOffsetTop = 20;
    var brickOffsetLeft = 20;
    var bricks = [];
    for(var c=0; c<brickColumnCount; c++){
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++){
            bricks[c][r] = { x: 0, y: 0,status: 1};
        }
    }
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if (bricks[c][r].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();}
            }
        }
    }
    function draw(){
       ctx.clearRect(0,0,w,h);
       drawBricks();
       collisionDetection();
       drawBall();
       drawPaddle();
       drawScore();
       drawLives();
       if ((by - radius) <= 0){
           bdy = -bdy;
       }
       if ((bx + radius) >= w){
            bdx = -bdx;
       }
       else if ((bx - radius) <= 0){
           bdx = -bdx;
       }
       bx += bdx;
       by += bdy;
       if (bx >= px-10 && px+70 >= bx){
           if (radius+by >= py-1 && radius+by <= py+1){
               bdy = -bdy;}
       }
       if (px >= 0 && px + 60 <= scrW){
           px = px;
       }
       else if (px <= 0){
           px = 0;
       }
       else if (px + 60 >= scrW){
           px = scrW - 60;
       }
       if(by > h+50){
           lives--;
           if(!lives){
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
            start();}
           else {
            alert("Lives:" + lives);
            bx = w/2;
            by = h/2+30;
            px = (w-60)/2;
            bdy = -1.5;
            bdx = 1.5;
           }
       }
    }
    function collisionDetection() {
     for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
       if(b.status == 1) {
        if(bx+radius > b.x && bx-radius < b.x+brickWidth && by+radius > b.y && by-radius < b.y+brickHeight) {
         if (bx-radius <= b.x + brickWidth && bx+radius >= b.x && !(by+radius < b.y && by-radius > b.y)){
             if (by > b.y + brickHeight || by < b.y){
                 bdy = -bdy;
             }
             else if (bx < b.x || bx > b.x + brickWidth){
                 bdx = -bdx;
             }
         }
         b.status = 0;
         score++;
         if(score == brickRowCount*brickColumnCount){
          alert("You won!\nScore:" + score);
          document.location.reload();
          clearInterval(interval);
          start();
         }
        }
       }
      }
     }
    }
    var lb = document.getElementById("left");
    var rb = document.getElementById("right");
    var leftInt,rightInt;
    lb.addEventListener("touchstart", function(ev){
        if (ev.cancelable){
        ev.preventDefault();}
        leftInt = setInterval(function(){
            if (px >= 0 || px <= w){
                px -= pdx;
            }
        },20);
    });
    lb.addEventListener("touchend", function(){
        clearInterval(leftInt);
    });
    rb.addEventListener("touchstart", function(ev){
        if (ev.cancelable){
        ev.preventDefault();}
        rightInt = setInterval(function(){
            if (px >= 0 || px <= w){
                px += pdx;
            }
        },20);
    });
    rb.addEventListener("touchend", function(){
        clearInterval(rightInt);
    });
    var interval = setInterval(draw,5);
}
function start(){
    var load = document.getElementById("loading");
    load.style.display = "none";
    var c = document.getElementById("c");
    c.style.display = "block";
    startGame();
}
setTimeout(start,3000);
