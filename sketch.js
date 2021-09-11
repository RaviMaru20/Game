/*

The Game Project 5 - Bring it all together

*/
var lives;
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var newFloor;
var isPlummeting;
var isGameOver;
var game_score;
var flagpole;
var platforms;

function setup()
{
	lives = 3;

	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	startGame();
	
	
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
	
	
	var onTop = false;
	if (gameChar_y != floorPos_y)
	{
		for(var i = 0; i<platforms.length; i++){
			if(platforms[i].checkPlat(gameChar_world_x,gameChar_y)==true)
			{
				onTop = true;
				newFloor = gameChar_y;
				isFalling = false;
				break;
			}
		}
		
		if(onTop==false)
		{
			isFalling = true;
			gameChar_y +=3;
		}
	}
	else 
	{
		isFalling = false;
	}

	if(flagpole.isreached == false)
	{
		checkFlagpole();
	}
	//
	push();
	translate(scrollPos,0);
	drawClouds();
	drawMountains();
	drawTrees();
	renderFlagpole(flagpole.x_pos);
	
	


	// Draw canyons.
	for(var i = 0; i < canyonsX.length; i++)
	{
		drawCanyon(canyonsX[i]);
		checkCanyon(canyonsX[i]);
	}
	for(var i = 0; i<platforms.length; i++){
		stroke(0);
		platforms[i].draw(); 
	}

	// Draw collectable items.
	
	for (var i = 0; i < coins.length; i++)
	{
		if(!coins[i].isFound)
		{
			drawCollectable(coins[i]);
			
			checkCollectable(coins[i]);
		}			
	}

	pop();
	



	// Draw game character
	checkPlayerDie();
	drawGameChar();
	checkGameOver();
	


	noStroke();
	fill(255);
	textSize(30);
	text("Score:"+ game_score,20,40);
	
	fill(255);
	text("Lives: ",150,40);
	if(flagpole.isreached == true)
	{
		fill(random(255),50,150)
		textSize(55);
		text("Level complete",width/2,100);
		text("press enter to continue",width/3,201);
		return;
	}
	for(var i = 0; i<lives; i++)
	{
		fill(random(255),random(50),random(255));
		rect(240 + i*20,25,15,15);
	
	} 
	// Logic to make the game character move or the background scroll.
	if(isLeft && isGameOver==false)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight&& isGameOver==false)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
		
	}

	// Logic to make the game character rise and fall.

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{


	if(isGameOver && keyCode == 13)
	{
			gameChar_x = 500;
			gameChar_y = floorPos_y;
			scrollPos = 0;
			//canyon.x_pos = 300;
			isGameOver = false;
			isPlummeting = false;
			flagpole.isreached = false;
			lives = 3;
			game_score = 0;
		
	}
	//turning left key
	if(keyCode == 37 || key == 'A')
	{
		isLeft = true;
		
		
	}
// turning Right key
	else if(keyCode == 39 || key == 'D')
	{
		isRight = true;
		
	}
// Jumping Spacebar Key
	if (keyCode == 32 && gameChar_y == floorPos_y&& isGameOver==false||newFloor==gameChar_y&& keyCode==32)
	{
		
		gameChar_y -= 150;  //gameChar_y - 100;
		
	}
	



}

function keyReleased()
{


	if(keyCode == 37 || key == 'A')
	{
		isLeft = false;
	}

	else if(keyCode == 39 || key == 'D')
	{
		isRight = false;
	}
	
	

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	//the game character
	strokeWeight(2);
	if(isLeft && isFalling)
	{
// add your jumping-left code
		stroke(1);
		fill(254, 200, 154);
		ellipse(gameChar_x-15,gameChar_y-50,30,7);
		fill(29, 53, 87);
		rect(gameChar_x-10, gameChar_y-50,20,30);
		fill(200, 200, 156);
		ellipse(gameChar_x,gameChar_y-60,30,30);
		fill(255);
		ellipse(gameChar_x-7,gameChar_y-62,7,7);
		fill(254, 200, 154);
		rect(gameChar_x-9,gameChar_y-20,7,20);
		rect(gameChar_x+3,gameChar_y-25,7,20);
		ellipse(gameChar_x-15,gameChar_y-40,30,7);


	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		stroke(1);
		fill(254, 200, 154)
		ellipse(gameChar_x+15,gameChar_y-50,30,7);
		fill(29, 53, 87);
		rect(gameChar_x-10, gameChar_y-50,20,30);
		fill(200, 200, 156);
		ellipse(gameChar_x,gameChar_y-60,30,30);
		fill(255);
		ellipse(gameChar_x+7,gameChar_y-62,7,7);
		fill(254, 200, 154)
		rect(gameChar_x-9,gameChar_y-25,7,20);
		rect(gameChar_x+3,gameChar_y-20,7,20);
		ellipse(gameChar_x+15,gameChar_y-40,30,7);


	}
	else if(isLeft)
	{
		// add your walking left code

		stroke(1);
		fill(29, 53, 87);
		rect(gameChar_x-10, gameChar_y-50,20,30);
		fill(200, 200, 156);
		ellipse(gameChar_x,gameChar_y-60,30,30);
		fill(255);
		ellipse(gameChar_x-7,gameChar_y-62,7,7);
		fill(254, 200, 154)
		rect(gameChar_x-9,gameChar_y-20,7,20);
		rect(gameChar_x+3,gameChar_y-20,7,20);
		ellipse(gameChar_x-10,gameChar_y-30,7,30);
		ellipse(gameChar_x+5,gameChar_y-30,7,30);
	}
	else if(isRight)
	{
		// add your walking right code
		stroke(1);
		fill(29, 53, 87);
		rect(gameChar_x-10, gameChar_y-50,20,30);
		fill(200, 200, 156);
		ellipse(gameChar_x,gameChar_y-60,30,30);
		fill(255);
		ellipse(gameChar_x+7,gameChar_y-62,7,7);
		fill(254, 200, 154)
		rect(gameChar_x-9,gameChar_y-20,7,20);
		rect(gameChar_x+3,gameChar_y-20,7,20);
		ellipse(gameChar_x-5,gameChar_y-30,7,30);
		ellipse(gameChar_x+10,gameChar_y-30,7,30);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		stroke(1);
		fill(29, 53, 87);
		rect(gameChar_x-10, gameChar_y-50,20,30);
		fill(200, 200, 156);
		ellipse(gameChar_x,gameChar_y-60,30,30);
		fill(255);
		ellipse(gameChar_x-7,gameChar_y-62,7,7);
		ellipse(gameChar_x+7,gameChar_y-62,7,7);
		fill(254, 200, 154)
		rect(gameChar_x-9,gameChar_y-20,7,20);
		rect(gameChar_x+3,gameChar_y-20,7,20);
		ellipse(gameChar_x-10,gameChar_y-60,7,30);
		ellipse(gameChar_x+10,gameChar_y-60,7,30);
	}
	else
	{
		// add your standing front facing code
		stroke(1);
		fill(29, 53, 87);
		rect(gameChar_x-10, gameChar_y-50,20,30);
		fill(200, 200, 156);
		ellipse(gameChar_x,gameChar_y-60,30,30);
		fill(255);
		ellipse(gameChar_x-7,gameChar_y-62,7,7);
		ellipse(gameChar_x+7,gameChar_y-62,7,7);
		fill(254, 200, 154)
		rect(gameChar_x-9,gameChar_y-20,7,20);
		rect(gameChar_x+3,gameChar_y-20,7,20);
		ellipse(gameChar_x-10,gameChar_y-30,7,30);
		ellipse(gameChar_x+10,gameChar_y-30,7,30);


	}
	// draw game character
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{

	for(var i = 0; i<clouds.length; i++)
	{

		fill(255,255,255);
		ellipse(clouds[i].x,clouds[i].y,70,70);
		ellipse(clouds[i].x+35,clouds[i].y+10,50,50);
		ellipse(clouds[i].x-35,clouds[i].y+10,50,50);
	
	}
	
}

// Function to draw mountains objects.
function drawMountains()
{
	for(var i = 0; i < mountain1.length; i++)
	{
		fill(255,144,66);
		triangle(mountain1[i],432,mountain1[i]+200,432-300,mountain1[i]+400,432);
		triangle(mountain1[i]+300,432,mountain1[i]+400,432-168,mountain1[i]+500,432);
	}	
}
// Function to draw trees objects.
function drawTrees()
{
	for(var i = 0; i < trees_x.length; i++)
	{
		fill(100,5,0) ;
		rect (75 +trees_x[i], -200/2 +floorPos_y,50,200/2);
		fill(0,100,0);
		triangle(trees_x[i] + 25,-200/2+ floorPos_y,
				trees_x[i] + 100,-200 + floorPos_y,
				trees_x[i] + 175, -200/2 + floorPos_y);
		triangle(trees_x[i],-200/4 + floorPos_y,
				trees_x[i] + 100, -200*3/4 + floorPos_y,
				trees_x[i] + 200, -200/4 + floorPos_y);
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
	fill(100, 155, 255);
	rect(t_canyon,432,100,144);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{


	if(gameChar_world_x >t_canyon &&gameChar_y==floorPos_y && gameChar_world_x<t_canyon+100)
	{
		isPlummeting = true;
		gameChar_y +=43;
		//isGameOver = true;
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{

	

	stroke(5);
	strokeWeight(2);
	fill(212, 0, 55);
	ellipse(t_collectable.x,t_collectable.y,40,40);
	fill(200,150,60);
	ellipse(t_collectable.x,t_collectable.y,40-20,40-20);

	
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{

	if(dist(gameChar_world_x, gameChar_y, t_collectable.x, t_collectable.y) < 30)
	{
		t_collectable.isFound = true;
		game_score += 1;
	}
}

function renderFlagpole(x)
{
	
	
	fill(100,255,100);
	rect(x,floorPos_y-200, 20, 200);
	fill(random(150),random(100),random(200));
	
	if (flagpole.isreached == true)
	{

		rect(x,floorPos_y-200,70,50);
	}
	else
	{
		rect(x,floorPos_y-50,70,50);
	}
}

function checkFlagpole()
{

	var d = abs(gameChar_world_x - flagpole.x_pos);
	
	if(d<15)
	{
		flagpole.isreached = true;
	}
}

function checkPlayerDie()
{
	if(gameChar_y>height)
		{
			for(var a = 0; a < coins.length; a++)
			{
				coins[a].isFound = false;
			}
		
			
			//isGameOver = true;
			if(lives >0){
			gameChar_x = 150;
			gameChar_y = floorPos_y;
			scrollPos = 0;
			//canyon.x_pos = 300;
			//isGameOver = false;
			isPlummeting = false;
			flagpole.isreached = false;
			lives -=1;
			}
		}	
}
function startGame()
{
	gameChar_x = width/2-400;
	gameChar_y = floorPos_y;
	game_score = 0;
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isGameOver = false;

	flagpole = {x_pos: 8000, isreached: false};

	// Initialise arrays of scenery objects.

	

	coins = [{x :490, y : 180, isFound : false},{x :700,y : 412, isFound : false},{x :1000,y : 290, isFound : false},{x :1530,y : 180, isFound : false},{x :2590,y : 170, isFound : false},{x :3500,y : 412, isFound : false}];

	canyonsX =[200,1900,3000,4000,5000];

	clouds = [{x: 100,y: 150},{x: 400,y: 100},{x: 500,y: 250},{x: 700,y: 300},{x: 900,y: 180},
			 {x: 1200,y: 120},{x: 2000,y: 200},{x: 2500,y: 250},{x: 2700,y: 190},
			 {x: 3000,y: 50},{x: 3300,y: 150},{x: 3500,y: 100},{x: 3900,y: 250},
			 {x: 4300,y: 300},{x: 4500,y: 150},{x: 4700,y: 100},{x: 5400,y: 250},{x: 5900,y: 300}];

	trees_x = [-55,390,950,1100,1200,1500,1600,1900,2100,2500,2700,3100,3500,4000,4300,4900,4700,
				5000,5700,6000,6300,6800,7000,7800,8500,10000,12000,13200];	

	mountain1 = [450, 1200, 1900, 2500, 3500, 4200, 4900, 5900, 6200,7000,7500,8200,9000,9300,10000];

	platforms = [];
	//for(var i = 0; i<10; i++)
	//{
	platforms.push(createPlatform(200,floorPos_y-75,150));
	platforms.push(createPlatform(300,floorPos_y-190,100));
	platforms.push(createPlatform(450,floorPos_y-230,100));


	platforms.push(createPlatform(1200,floorPos_y-100,150));
	platforms.push(createPlatform(1300,floorPos_y-190,100));
	platforms.push(createPlatform(1450,floorPos_y-230,100));
	
	platforms.push(createPlatform(2500,floorPos_y-100,150));
	platforms.push(createPlatform(2700,floorPos_y-190,100));
	platforms.push(createPlatform(2750,floorPos_y-230,100));
	//}
}
function checkGameOver()
{
	if (lives < 1)
	{
		fill(0);
		textSize(100);
		text("Game Over",width/3,height/2-200);
		fill(200,0,0);
		textSize(30);
		text("Press ENTER to Continue",width/2-100,height/2-75);
		isGameOver = true;
		
	}
}

function createPlatform(x,y,length){

	var p = {
		x: x,
		y: y,
		length: length,
		draw: function()
		{
			fill(200,0,0);
			rect(this.x,this.y,this.length, 25);
		},
		checkPlat: function(mariox,marioy)
		{
			if(mariox>this.x && mariox< this.x+this.length)
			{
				var d = this.y - marioy;
				if(d>=0 && d<5)
				{
					return true;
				}
			}
			return false;
		} 
	}
	return p;
}