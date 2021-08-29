var PLAY=1;
var END=0;
var gameState=PLAY;


var coin;
var mario,mariocollided;
var obstacle1,obstacle2,obstacle3;
var gameOver,restart;
var score=0;

function preload(){
//background =loadImage("backg.jpg")
capture1=loadImage("Capture1.png");
capture3=loadImage("Capture3.png");
capture4=loadImage("Capture4.png");
coinImg=loadImage("coin.png")
mariodead=loadImage("mariodead.png");

obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");

restart=loadImage("restart.png");

mario_running=loadAnimation("Capture1.png","Capture3.png","Capture4.png");
mario_collided=loadAnimation("mariodead.png");

gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
}



function setup (){
    createCanvas(600,200);

    mario=createSprite(50,150,10,10);
    mario.addAnimation("running",mario_running);
    mario.scale=0.5;

    ground=createSprite(0,190,600,10);
    ground.x=ground.width/2;
    ground.velocityX = -(6 + 3*score/100);
  
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 0.5;

    restart = createSprite(300,140);
    restart.addImage(restartImg);
    restart.visible = false;
    restart.scale = 0.5;
  
    coinGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;

}

function draw(){
    background("pink");
    textSize(20);
    fill(255);
    text("Score: "+ score, 500,40);
 
    drawSprites()

    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
       if(score >= 0){
         ground.velocityX = -6;
       }else{
         ground.velocityX = -(6 + 3*score/100);
       }
     
       if(keyDown("space") && mario.y >= 139) {
         mario.velocityY = -12;
       }
     
       mario.velocityY = mario.velocityY + 0.8
     
       if (ground.x < 0){
         ground.x = ground.width/2;
       }
     
       mario.collide(ground);
       
       spawnCoin();
       spawnObstacles();
     
      if(obstaclesGroup.isTouching(mario)){
           gameState = END;
       } 
     }


     else if (gameState === END ) {
      gameOver.visible = true;
      restart.visible = true;
      mario.addAnimation("collided", mario_collided);
      
      // velocity 0
      ground.velocityX = 0;
      mario.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      coinGroup.setVelocityXEach(0);
      
      //change the trex animation
      mario.changeAnimation("collided",mario_collided);
      mario.scale =0.35;
      
      // lifetime for coin and obstacle group
      obstaclesGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
  }
  
  function spawnCoin() {
    // for spawn obstacles....
    if (frameCount % 60 === 0) {
      var coin = createSprite(600,120,40,10);
      coin.y = Math.round(random(80,120));
      coin.addImage(coinImg);
      coin.scale = 0.1;
      coin.velocityX = -3;
      coin.lifetime = 200;
      
      //depth of mario and coin
      coin.depth = mario.depth;
      mario.depth = mario.depth + 1;
      
      //add each cloud to the group
      coinGroup.add(coin);
    }
    
  }
  
  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);    
      // random obstacles
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle2);
                break;
        case 2: obstacle.addImage(obstacle1);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
      }
      obstacle.velocityX = -(6 + 3*score/100);
      
      // scale and lifetime to the obstacle           
      obstacle.scale = 0.2;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();
    
    mario.changeAnimation("running",mario_running);
    mario.scale =0.5;
    
    if(localStorage["HighestScore"]<score){
      localStorage["HighestScore"] = score;
    }
    
    score = 0;
    
  }
    