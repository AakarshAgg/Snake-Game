//Game constants & Variables
let inputDir = { x: 0, y: 0 }; //this is used initially when snake is not moving when game start
const foodSound = new Audio('music/food.mp3') //initialize the food sound
const gameOverSound = new Audio('music/gameover.mp3') //gameover sound
const moveSound = new Audio('music/move.mp3')  //when snakes move
const musicSound = new Audio('music/music.mp3') //this is background music sound
let speed = 4; //used a variale to set speed
let score = 0; //used as variable to set the score
let hiscoreval;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 13 }    //snake head location
]
//let food = { x: 6, y: 7 } //set intial food location
let food = { x: Math.round(2 + (18 - 2) * Math.random()), y: Math.round(2 + (18 - 2) * Math.random()) } //use to initially generate random food
food !={x:13,y:13}

//Game functions
function main(ctime) {   //this function is use to set the speed of the game 
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }; //to convert milliseconds into seconds //lastPaintTime is the last time to paint the game // 1/speed is the time which have to render the variable
    //console.log(ctime)
    lastPaintTime = ctime;
    gameEngine(); //this method is use to run the game
}

//collision function
function isCollide(snake) {

    //if we bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {//for the length of the snake 
       //if head element of the array is equal to any of the element in the array then return true 
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    //if you bump into the wall
    //if any of the coordinate is greater than length of the grid
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y < 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    
    //part 1:updating the snake array & food

    //when snake collides//if returns true
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        alert("Game Over .Press any key to play again!")
        inputDir = { x: 0, y: 0 };//use to pause the snake when game restarts 
        snakeArr = [{ x: 13, y: 13 }]
        musicSound.play();
        musicSound.loop=true;
        score = 0;
    }

    //if you have eaten the food increment the score and regenerate the food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        //when both the cordinates of the food and snake match with each other
        foodSound.play();//play sound when snake eat the food
        score += 1; //increase score by 1
        if(score>hiscoreval){ //if score is greater than high score
            hiscoreval=score //store the score in hi score
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval)) //store the score in local storage by converting into string
            hiscorebox.innerHTML="Hi-Score:"+hiscoreval;
        //or   // document.getElementById('hiscorebox').innerHTML="Hi-Score:"+hiscoreval;
        }

        document.getElementById("score").innerHTML = "Score:" + score; //use to update score
        console.log("before-----")
        console.log("sx",snakeArr[0].x + inputDir.x)
       console.log("sy",snakeArr[0].y + inputDir.y)
        console.log("ix",inputDir.x)
       console.log("iy",inputDir.y)

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
       
        console.log("--------after")
        console.log("sx",snakeArr[0].x + inputDir.x)
       console.log("sy",snakeArr[0].y + inputDir.y)
        console.log("ix",inputDir.x)
       console.log("iy",inputDir.y)
        let a = 2;//upto x cordinate to generate the food
        let b = 18;//upto y cordinate to generate the food
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }//use to generate food anywhere when game starts

    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    //part 2:display the snake and food
    
    //display the snake
    board.innerHTML = ""; //it is compulsory to remove inner html in board of any kind,otherwise snake will go long
    snakeArr.forEach((e, index) => { //e->value of each object in array and index->particular index of the array
        snakeElement = document.createElement('div') //use to create element "div"
        snakeElement.style.gridRowStart = e.y; //use to display snake in grid row value of which comming from top
        snakeElement.style.gridColumnStart = e.x;//use to display snake in grid row value of which comming from the top
        
        //use to customize the class
        if (index === 0) { //if current index is zero
            snakeElement.classList.add('head')  //add class head to the snake
        } else {
            snakeElement.classList.add('snake') //if index is not zero add class snake
        }
        board.appendChild(snakeElement); //use to append the created div in board element 
    })


    //displaying the food
    foodElement = document.createElement('div')  //use to create element "div"
    foodElement.style.gridRowStart = food.y; //use to display food in grid row vale of which comming from top
    foodElement.style.gridColumnStart = food.x; //use to display food in grid column value of which comming from the top
    foodElement.classList.add('food') //use to add class "food"
    board.appendChild(foodElement); //use to append the created div in board element 
}




//Main logic starts here

musicSound.play(); //use to play bg music
musicSound.loop=true; //use to repeat the bg music

//for hiscore
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval=JSON.parse(hiscore)
    hiscorebox.innerHTML="Hi-Score:"+hiscore;
}

window.requestAnimationFrame(main); //starting from here// looping of function //game loop

window.addEventListener('keydown', e => {
   // inputDir = { x: 0, y: 1 }  //start the game
    moveSound.play();
    switch (e.key) {  //switch when  keys are pressed
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0; 
            inputDir.y = -1; //when up key is press then snake will move in -y direction//we need to snake up that is against +y direction
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;//when down key is press then snake will move in +y direction //move in + y direction
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;//when left key is press then snake will move in -x direction //move in -x direction
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1; //when right key is press then snake will move in +x direction //move in +x direction
            inputDir.y = 0;
            break;
        case "p":
            console.log("pause")
            inputDir = { x: 0, y: 0 };
            break;

        default:
            break;
    }
})