const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20 
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0 

//create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

let blocks = [];
function addBlocks(){
    blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
  ];

  blocks.forEach((block) =>{
    const blockElement = document.createElement('div');
    blockElement.classList.add('block');
    blockElement.style.left = block.bottomLeft[0] + 'px';
    blockElement.style.bottom = block.bottomLeft[1] + 'px';
    grid.appendChild(blockElement);
  })
    }

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user 
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user
function moveUser(e){
    switch(e.key) {
        case 'ArrowLeft': 
            if (currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }  
            break; 
        case 'ArrowRight':
            if (currentPosition[0] < (boardWidth - blockWidth)) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
        case 'r':
        case 'R':
            restartGame();
            break;
    }
}

document.addEventListener("keydown", moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

drawBlocks();

//move ball
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
    
}

timerId = setInterval(moveBall, 30)

//chek for collisions
function checkForCollisions() {
    //chek for block collisions
    for(let i = 0; i < blocks.length; i++) {
        if
        (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && 
            ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
             ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) 
            {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            const collidedBlock = allBlocks[i];
            collidedBlock.classList.remove('block')
            collidedBlock.remove();
            blocks.splice(i,1); 
            changeDirection();
            score++
            scoreDisplay.innerHTML = score
            
            //check for win 
            if(blocks.length == 0 ) {
                 window.alert('YOU WIN!!!')
                 clearInterval(timerId)
                 document.removeEventListener('keydown', moveUser)
            }

        }
    }
    
    //check for wall collisions
    if 
        (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[0] <= 0 ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) 
        ) 
            {
            changeDirection()
            }
        

    //check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ) {
            changeDirection()
        }


    //check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        window.alert('YOU LOSE :(. PRESS R TO RESTART')
        document.addEventListener('keydown', function (e) {
            if (e.key === 'r' || e.key === 'R') {
              restartGame();
            }
          });
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
} 

function restartGame(){
    currentPosition = userStart;
    ballCurrentPosition = ballStart;
    xDirection = -2;
    yDirection = 2;
    score = 0;
    scoreDisplay.innerHTML = score;
    
    const allBlocks = document.querySelectorAll('.block');
    allBlocks.forEach((block) => block.remove());

    
    addBlocks();
    drawUser();
    drawBall();

  clearInterval(timerId);
  timerId = setInterval(moveBall, 30);
    

}

document.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R') {
      restartGame();
    }
  });