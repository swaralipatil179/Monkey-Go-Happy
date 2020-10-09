
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
 
monkey=createSprite(50,320,20,50);
  monkey.scale=0.2
  
  
  
  monkey.addAnimation("monkey",monkey_running);
  
bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score=0;


}


function draw() {
background("white")
    fill("black")
   textSize(20)
text("Survival Time:"+score,200,50)
  ground=createSprite(300,380,600,10);
   ground.x = ground.width /2;
  
  
  
  
  
  if (gameState===PLAY){
    
    score =score+Math.round(getFrameRate()/60);
   // console.log(score)
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY =-12
    

    }  
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
  
   ground=createSprite(300,380,600,10);
   
   if (ground.x < 0){
      ground.x = ground.width/2;
       ground.velocityX = -(4 + 3* score/100)
    }
  
     spawnObstacles();
   spawnBanana();
    
    if (obstaclesGroup.isTouching(monkey)){
    gameState=END;  
    }
  }
  else if(gameState===END){
      ground.velocityX = 0;
      monkey.velocityY = 0;
    
    obstaclesGroup.setLifetimeEach=(-1);
    bananaGroup.setLifetimeEACH=(-1);
    
    obstaclesGroup.setVelocityXEach=(0);
    bananaGroup.setVelocityXEach=(0);
  }
  
    drawSprites();
}

function reset(){
  gameState=PLAY
  obstaclesGroup.destroyEach(); 
 bananaGroup.destroyEach();
}


function spawnBanana(){
if(Math.round(frameCount%60===0)){
   banana=createSprite(200,200,20,20);
  banana.scale=0.1
  banana.addImage("banana",bananaImage);
  banana.velocityX=-3
banana.lifetime = 200;
   banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  
}
  
  
  
}
 function spawnObstacles(){
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,400,10,40);
      obstacle.velocityX = -(6 + score/100);
   obstacle.y=Math.round(random(80,120))
      obstacle.addImage("obstacle",obstacleImage);
     obstacle.velocityX=-6  
     obstacle.scale=0.3
       obstacle.lifetime = 300;
     obstaclesGroup.add(obstacle);
     
     
     
 } 
 }




