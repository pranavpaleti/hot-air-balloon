var bgImage;
var database;
var reference;
var position;
var height;
var balloon,balloonImage,balloon1Image,balloon2Image;
function preload(){
  bgImage=loadImage("background.png")
  balloonImage=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
  balloon1Image=loadAnimation("Hot Air Ballon-04.png","Hot Air Ballon-03.png","Hot Air Ballon-02.png")
}
function setup() {
  createCanvas(1350,600);
  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("balloon",balloonImage);
  balloon.addAnimation("ballon",balloon1Image);
  
  balloon.scale=0.5
  database=firebase.database();
  console.log(database);
  var balloonPosition=database.ref('balloon/height')
  balloonPosition.on("value",readHeight,showError)
  
}

function draw() {
  background(bgImage);  
  if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0)
  balloon.changeAnimation("ballon",balloon1Image)
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
    balloon.changeAnimation("ballon",balloon1Image)
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.changeAnimation("ballon",balloon1Image)
   balloon.scale=balloon.scale -0.01
  }
  else if(keyDown(DOWN_ARROW)){
   updateHeight(0,10)
   balloon.changeAnimation("ballon",balloon1Image)
   balloon.scale=balloon.scale +0.01
  }
  
  drawSprites();
  textSize(20)
  text("USE ARROW KEYS TO MOVE BALLOON",100,20);
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
      'x':position.x+x,
      'y':position.y+y
  })
  }
  function showError(){
      console.log("Error in writing to the database")
  }
  function readHeight(data){
      position=data.val();
      balloon.x=position.x;
      balloon.y=position.y;
  }