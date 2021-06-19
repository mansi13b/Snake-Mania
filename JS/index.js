 //Game Constants and Variables
 let inputDir = {x:0,y:0}; //initial direction is(0,0)
 const foodSound= new Audio('food.wav');
 const gameOverSound= new Audio('gameOver.wav');
 const moveSound= new Audio('move.mp3');
 const musicSound= new Audio('main_back.wav');
 let speed=8;
 let score=0;
 let lastPaintTime=0;

let snakeArr=[
    {x:13, y:15} //snake head {x,y} //snake will keep on increasing so it is array
]
food={x:6, y:8}; //its not array its just a particle
//Gaming Functions
//fps-frames per sec .how many frames (images) your monitor is displaying each second. The higher the FPS, the smoother and more responsive the game will seem

//ctime:current time which shows last time file got changed
function main(ctime){
    window.requestAnimationFrame(main);  
  //  console.log(ctime);
    //now to control fs, if given condn is less than 1/2 wait uptil then
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    //else
    lastPaintTime = ctime;
    gameEngine(); //will run game

   
}


function isCollide(snake){
    //collide if hit wall or snake bumps into itself
    for (let i = 1 ; i < snakeArr.length; i++){
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
           return true;
       }
    }
1      //in case of hitting wall  
       if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        {
            return true;
        }
    
    return false;

}


function gameEngine(){
    //we'll make it in two parts- 
    //PART 1 : will update snake and display
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir= {x:0,y:0};
        alert("Game Over Press any key to play again");
        snakeArr=[ {x:13, y:15}];
        musicSound.play();
        score=0;

    }
    //if you have eaten food then update score and regenrate the food
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x)
    {
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML= "HIGH SCORE :"+ hiscoreval;
        }
        scoreBox.innerHTML="SCORE: "+ score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y}) //will add element in start of array
        //generate food again randomly , our grid is from 0 to 18
        let a=2;
        let b=16;
        //formula to generate random num between a and b
        food={x: Math.round(a+ (b - a)* Math.random()), y: Math.round(a+ (b - a)* Math.random())}
    
    }

    //Moving the snake
     for (let i = snakeArr.length - 2;  i>=0; i--) {
        
         snakeArr[i+ 1] = {...snakeArr[i]};// altogether new object having snakeArr[i] to avoid refrencing problem
         
     }
     snakeArr[0].x+= inputDir.x;
     snakeArr[0].y+= inputDir.y;

    //PART 2: Display the snake and food

    //Display the snake
     board.innerHTML="";
     snakeArr.forEach((e, index)=>{
         snakeElement= document.createElement('div');
         snakeElement.style.gridRowStart = e.y;
         snakeElement.style.gridColumnStart = e.x;
         
         if(index==0){
             //display only head if index i 0 else snake
            snakeElement.classList.add('head');
         }
         else
         {snakeElement.classList.add('snake'); }
  
         board.appendChild(snakeElement); 
     });

     //Display the food
     foodElement= document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food'); //o add food
     board.appendChild(foodElement); 


}



 //Main Logic starts here
 musicSound.play();
 let hiscore=localStorage.getItem("hiscore");
 if(hiscore==null)
 {  let hiscoreval=0;
     localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
 }
 else{
     hiscoreval = JSON.parse(hiscore);
     hiscoreBox.innerHTML= "HIGH SCORE :"+ hiscore;
 }
window.requestAnimationFrame(main); 
window.addEventListener('keydown',e=>{
    inputDir= {x:0,y:1} //starting game as keyDown so snake first moves in downward direction
    moveSound.play();
    switch(e.key){  //means to find which event key is pressed
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    }
});
