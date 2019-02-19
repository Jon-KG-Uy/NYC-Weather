var eWidth = 30;
var eHeight = 40;
var eX = 80;
var eY = 110;
var condX = 200;
var condY = 30;
var cityY = 400;
var cityX = 75;
var timeX = 540;
var timeY = 395;
var dateX = 60;
var dateY = 395;
var w; //weather variable 
var c;
var cpop; //using custom parameters

//p5 processing 

function preload() {
  //New York weather by ID and API Key
	var url = 'https://api.openweathermap.org/data/2.5/weather?'+
      'id=5128581&APPID=73774fc921734e6abd0e19b047df193f';
	w = loadJSON(url);
  
}

function setup() {
  createCanvas(600, 400);
  c = new Cloud();
  cpop = new Cloud();
}

function draw() {
	var hr = hour();
	var min = minute();
	var d = day();
	var m = month();
	var y = year();
  var cName = w.name;
  //comment as necessary to test other functions
  var wCond = w.weather[0].main; 
  //var wCond = "Clouds";
  var k = w.main.temp;
  
  background(220);
  //noLoop();
  fill(0)
  textAlign(CENTER);
  textSize(24);
  
  if(wCond == "Clouds"){
  	cloud(wCond, cName);
  }
  if(wCond == "Rain"){
  	rain(wCond, cName);
  }
  if(wCond == "Clear"){
    sunny(wCond, cName);
  }
  
  city();
    
  //thermometer --> map()?
  temp(k);
  
  dateTime(hr, min, d, m ,y);
}

//cloud function, draws a few clouds in the sky
//update for partly cloudy? suppose this could depend on weather API
//background changes based on precipitation percent? (gray/blue)

//class!

function cloud(wCond, cName){
  if(wCond == "Clouds"){
  background(49, 205, 255);
  text("It is cloudy in " + cName + " today!", condX, condY);
	}
//implement endless loop scroll?
  /*
  fill(220);
  noLoop();
  for(i = 0; i < 3; i++){ 
    noStroke();
  	ellipse(eX, eY, eWidth+5, eHeight);
  	ellipse(eX+10, eY-10, eWidth, eHeight);
  	ellipse(eX+10, eY+10, eWidth, eHeight);
  	ellipse(eX+30, eY-10, eWidth, eHeight);
  	ellipse(eX+30, eY+10, eWidth, eHeight);
  	ellipse(eX+40, eY, eWidth+5, eHeight);
      
    //need to reset values? use temp val?  
  	eX+=100;
    if(i == 0){       
  	  eY-=30;
  	}
    else if(i == 1){
    	eY+=50;
  	}
  }
  */
  c.display();
}

class Cloud{
  constructor(){
    this.x = 80;
    this.y = 110;
    this.w = 30;
		this.h = 40;
  }
  
  //custom constructor?
  
  display(){
    fill(220);
    noLoop();
    noStroke();
  	ellipse(this.x, this.y, this.w+5, this.h);
  	ellipse(this.x+10, this.y-10, this.w, this.h);
  	ellipse(this.x+10, this.y+10, this.w, this.h);
  	ellipse(this.x+30, this.y-10, this.w, this.h);
  	ellipse(this.x+30, this.y+10, this.w, this.h);
  	ellipse(this.x+40, this.y, this.w+5, this.h);
  }
}


//rain
function rain(wCond, cName){
  background(183, 183, 183);
  fill(0);
	text("It is " + wCond + "ing in " + cName + " today!", condX, condY);
  stroke('blue');
  var lineX = 80;
  var lineY = 120;
  for(i = 0; i < 13; i++){
  	line(lineX, lineY, lineX, lineY+70);
    lineX += 13
    if(i == 3){
      lineX+=40;
      lineY-=40;
    }
    if(i == 8){
    	lineX+=43;
      lineY+=60;
    }
    if(i%2 == 0){
      lineY-=20;
    }
    else{
      lineY = 120;
    }
  }  
  cloud(wCond, cName); 
}

 
//clear/sunny function 
function sunny(wCond, cName) {
    background(49, 205, 255);
    text("It is " + wCond + " in " + cName + " today!", condX, condY);
    fill(255, 240, 0)
    ellipse(width/2, 110, 60, 60)
}

//draw city function
//vector graphic, png, load in 
function city(){  
  fill(170);
  noLoop();
  stroke(0);
	rect(cityX, cityY, 40, 100*-1);
  rect(cityX+=40, cityY, 30, 70*-1);
  rect(cityX+=30, cityY, 40, 120*-1);
  rect(cityX+=40, cityY, 30, 160*-1);
  rect(cityX+=30, cityY, 30, 90*-1);    
  rect(cityX+=30, cityY, 35, 60*-1);
	rect(cityX+=35, cityY, 40, 80*-1);
  noStroke();
  rect(0, cityY, width, 20*-1);
  
}

//calc and display temperature
function temp(k){
 fill(0);
  var temp = round((k - 273.15) * (9/5) + 32);
  textSize(16);
  text("Temp: " + temp + " °F", 350, 70);
  fill(100);
  rectMode(CENTER);
  rect(300, 390, 200, 20, 30);
  map(temp, 0, 100, 0, 200);
  fill('red');
  rect(224, 390, temp, 20, 30); 
  //temp*-1 doesn't seem to invert bar for some reason,
  //rounded corner '30' param seems to mess it up
}

//date&time
function dateTime(hr, min, d, m ,y){
  fill(0);
  textSize(16);
  text("Date: " + m + "/" + d + "/" + y, dateX, dateY); 
  if(min < 10){
    	min = '0' + min;
  }
  if(hr > 12){
    hr-=12
  	text("Time: " + hr + ":" + min + " PM", timeX, timeY);
  }
  else{
  	text("Time: " + hr + ":" + min + " AM", timeX, timeY);
  }
}