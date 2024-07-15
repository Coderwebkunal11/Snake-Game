 // Game Constants & Variables
 let inputDir = {x: 0 , y: -1}; // change here
 let score = 0;   // change here
 const foodsound =new Audio("food.mp3");
 const gameover = new Audio("gameover.mp3");
 const movesound = new Audio("snakemoving.mp3");
 const musicSound = new Audio("snake_music.mp3");
 let speed=2;
 let lastPaintTime=0;
 let snakeArr = [
   {x: 13, y: 15}
 ];
 food ={x: 6 , y: 7};


 // Game Functions
 function main(ctime){
 window.requestAnimationFrame(main);
//  console.log(ctime)
 if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
 }
    lastPaintTime=ctime;
    gameEngine();
}

 function isCollide(snake){
   //if you bump into yourself
   for(let i =1; i<snakeArr.length; i++){ // Change here
   //  if(snake[i].x ===snake[0].x && snake[i].y ===snake[0].y && i !== 0 ){   error - 1 yaha pr tha ... niche sahi wlaa likh diye h
      if(snake[i].x ===snake[0].x && snake[i].y ===snake[0].y  ){
      return true;
    }
   }
   // if you nump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){

      return true;
    }
    return false;
   }
 
 
 function gameEngine(){
    // part 1: Updating the snake array & food
      if(isCollide(snakeArr)){   // Change here
         gameover.play();
         musicSound.pause();
         inputDir = {x: 0 , y: -1};      // Change Here
         alert("Game over.press any key to play again!")
         snakeArr = [{x:13, y:15}];
         musicSound.play(); 
         score = 0;
      }
   // if you have eaten the food, increment the score and regenrate the food
   if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
      foodsound.play();
      score +=1;
      console.log("score:" + score);
      let highscoreBox = document.getElementById("highscoreBox");
      let highscore = localStorage.getItem("highscore");
      if(score>highscore){                    // yaha pr direction change kiye h
         highscore = score;
         localStorage.setItem("highscore",highscore);
         highscoreBox.innerHTML ="High Score:" + highscore;
      }
      scoreBox.innerHTML = "Score:" + score;
      snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
      let a = 2;
      let b = 16;
      food  = {x: Math.round(a +(b-a)* Math.random()),y: Math.round(a +(b-a)* Math.random())}
   }
   // moving the snake
   for(let i= snakeArr.length -2; i>=0; i--){     //yaha pr i>=0 kiye h
      snakeArr[i+1] = {...snakeArr[i]}
   }
   snakeArr[0].x += inputDir.x; // change here
   snakeArr[0].y += inputDir.y; // change here

      // if you have eaten the food,
    // part 2: Display the snake and food
    // Display the snake
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('snake');
        if(index === 0){
           snakeElement.classList.add('head');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
 }



 //Main logic starts here
 let highscore=localStorage.getItem("highscore");
 if(highscore === null){
   highscore=0;
   localStorage.setItem("highscore",highscore);
 }
 else{  
   highscoreval = parseInt(highscore);
    highscoreBox.innerHTML ="High Score:" + highscore;
 }
 window.requestAnimationFrame(main);
 window.addEventListener('keydown', e=>{
     movesound.play();
                        // change here remove this line
     switch(e.key){
      case "ArrowUp":   // change here ( Spelling Mistake )
         console.log("ArrowUp");
         inputDir.x= 0;
         inputDir.y= -1;
         break;
      case "ArrowDown":
         console.log("ArrowDown");
         inputDir.x= 0;
         inputDir.y= 1;
         break;
      case "ArrowLeft": // change here ( Spelling Mistake )
         console.log("ArrowLeft");
         inputDir.x= -1;
         inputDir.y= 0;
         break;
      case "ArrowRight":
         console.log("ArrowRight");
         inputDir.x= 1;
         inputDir.y= 0;
         break;

      default:
         break;
     }
 });

