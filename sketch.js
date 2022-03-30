var play = 1;
var end = 0;
var gamestate = play;

var rimpy,rimpyImage;
var kidnapper;
var  rocks,car,barrier;
var bg;
var ground,groundImage;
var obstaclesGroup , car1IMg , car2Img , rock1Img , rock2Img , barrierImg;
var score=0 ;


function preload()
{
  groundImage = loadImage("images/ground2.png");
  rock1Img = loadImage("images/rock-removebg-preview.png");
  rock2Img = loadImage("images/rock2-removebg-preview.png");
  car1Img = loadImage("images/car_1-removebg-preview.png");
  car2Img = loadImage("images/car2-removebg-preview.png");
  barrierImg = loadImage("images/barrier-removebg-preview.png");
  rimpyImage = loadImage("images/boy-removebg-preview.png");
}

function setup() {
  createCanvas(700,500);
  frameRate(80);
   
  obstaclesGroup=new Group();
  
  ground = createSprite(200,480,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;

  invisibleGround = createSprite(200,489,400,20);
  invisibleGround.visible = false;
  
  rimpy = createSprite(50,460,20,50)
  rimpy.addImage(rimpyImage);
  rimpy.scale=0.3;
  rimpy.setCollider("rectangle",0,0,rimpy.width-30,rimpy.height-30)
  rimpy.debug=true
  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  text("Score: "+ score, 500,50);

  if(gamestate===play){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && rimpy.y >= 400) {
      rimpy.velocityY = -19;
    }
    rimpy.velocityY = rimpy.velocityY + 0.8
  
    rimpy.collide(invisibleGround)
    
     score=score +Math.round(getFrameRate()/60)
  
     if(obstaclesGroup.isTouching(rimpy)){
      
      gamestate = end ;        
     
     }
  
     spawnObstacles();
  }

  
   if(gamestate===end){

      ground.velocityX=0;
      obstaclesGroup.setVelocityXEach(0);
      rimpy.velocityY=0;

   }
   
  
    
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacles= createSprite(710,460)
     obstacles.velocityX=-5;

    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacles.addImage(car1Img);
              break;
      case 2: obstacles.addImage(car2Img);
              break;        
      case 3: obstacles.addImage(rock1Img);
              break;
      case 4: obstacles.addImage(rock2Img);
              break;
      case 5: obstacles.addImage(barrierImg);
              break;
      default: break;
    }
    obstacles.scale=0.2;
    obstacles.lifetime=600;
    obstaclesGroup.add(obstacles);

  }
}
 