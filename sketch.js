var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj,feedDog,lastFed,LfedTime;

//create feed and lastFed variable here


function preload()
{
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  LfedTime=database.ref('feedTime');
  LfedTime.on("value",readTime);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog=createButton("feed the dog");
  feedDog.position(700,95);
  feedDog.mousePressed(feedTheDog);

  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fill('black')
  textSize(20)
if(lastFed<=12)
{
text('Last fed time: \n'+lastFed+' AM',350,25)
}
else if(lastFed>=13)
{
  text('Last fed time: \n'+lastFed+' PM',350,25)
}
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
 lastFed=data.val();
  //foodObj.updateFoodStock(foodS);
}


function feedTheDog(){
  lastFed=hour();
  
  database.ref('/').update({
    feedTime:lastFed
  })
  //write code here to update food stock and last fed time
  if(foodS>0)
  {
  dog.addImage(happyDog);
  foodS=foodS-1;
  }
  else if(foodS=0)
  {
    foodS=foodS*0
  }
  database.ref('/').update({
    Food:foodS
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
