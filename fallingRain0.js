var AvoidRainGame = {};
var canvas= document.querySelector('.canvas');
var ctx = canvas.getContext('2d');
// var gameStatus = true;

//rainArray
AvoidRainGame.RainArray =[];

var newDrops = setInterval(function(){
	console.log("in");
	for(var i=0; i< 10;i++){
		AvoidRainGame.RainArray.push(new AvoidRainGame.Rain());
	} 
},1000);

//rain
AvoidRainGame.Rain = function(){
	this.rainPosX = this.setRainPosX();
	this.rainPosY = this.setRainPosY();
}

AvoidRainGame.Rain.prototype.setRainPosX = function(){
	return rand(0, canvas.width);
};

AvoidRainGame.Rain.prototype.setRainPosY = function(){
	return rand(-500, 0);
};

AvoidRainGame.Rain.prototype.isFalling = function(){
	//array에 있는 비를 하나씩 꺼내서 각각 떨어뜨려준다.
	var fallAmount =3;
	if(this.rainPosY < 2 * canvas.height){
		//set falling = true;
		return this.rainPosY = this.rainPosY + fallAmount;
	}else{
		//add point
		//delete rain
		//set falling = false;
		AvoidRainGame.RainArray.shift();
		console.log("end");
		return;
	}
};
AvoidRainGame.Rain.prototype.draw = function(){
	var rainRadius = 5;
	var color = '#F0E3FF';
	var startAngle = 0;
	var endAngle = 2* Math.PI;

    ctx.beginPath();
    ctx.arc(this.rainPosX, this.rainPosY, rainRadius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};

//character
AvoidRainGame.Player = (function(){
	var playerHeight = 100;
	var playerWidth =20;
	var playerPosX = canvas.width/2;
	var playerPosY = canvas.height - playerHeight;
	var step = 15;

	return{
		getPosX: function(){
			return playerPosX;
		},
		getPosY: function(){
			return playerPosY;
		},
		getWidth: function(){
			return playerWidth;
		},
		moveLeft: function(){
			return playerPosX = playerPosX - step;
		},
		moveRight: function(){
			return playerPosX = playerPosX + step;
		},
		draw: function(){
			ctx.beginPath();
		    ctx.fillStyle = '#9C2765';
		    ctx.fillRect(playerPosX, playerPosY, playerWidth, playerHeight);
		    ctx.closePath();
		},
		getPlayerPosX: function(){
			return this.playerPosX;
		},
	}

})();

//success or fail Logic
AvoidRainGame.GameStats = (function(){
	var status = true;
	//if dead, set status to false and stop animation frame
	var score =0;

	return{
		checkCollision: function(){
			for(var i=0; i< AvoidRainGame.RainArray.length; i++){
				if((AvoidRainGame.RainArray[i].rainPosY + 5 >= AvoidRainGame.Player.getPosY()) && (AvoidRainGame.RainArray[i].rainPosX - 5 <=AvoidRainGame.Player.getPosX() + AvoidRainGame.Player.getWidth() && AvoidRainGame.RainArray[i].rainPosX + 5 >= AvoidRainGame.Player.getPosX())){
					this.failMessage();
				}
			}
		},
		resetStatus: function(){
			status = true;
			score = 0;
		},
		failMessage: function(){
			// doucument.getElementById('showGameStatus').style.display = "block";
			console.log("fail");
			status = false;
		},
		getStatus: function(){
			return status;
		}
	}
})();

//draw all on canvas; animation
AvoidRainGame.drawAll = function(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	//put rain into array and draw all of them
	for(var i =0; i<AvoidRainGame.RainArray.length; i++){
		AvoidRainGame.RainArray[i].isFalling();
		AvoidRainGame.RainArray[i].draw();
	}
	AvoidRainGame.Player.draw();
	AvoidRainGame.GameStats.checkCollision();
	if(AvoidRainGame.GameStats.getStatus() == true){
		AvoidRainGame.requestAnimationFrame = window.requestAnimationFrame(AvoidRainGame.drawAll);
	}else{
		window.cancelAnimationFrame(AvoidRainGame.requestAnimationFrame);
		clearInterval(newDrops);
	}
};

function rand(min, max){
	return (Math.random()*(max -min) + min);
};


//Putting in the very first 10 raindrops at start
for(var i=0; i< 10;i++){
		AvoidRainGame.RainArray.push(new AvoidRainGame.Rain());
	} 
//added event to move with keys
document.addEventListener('keydown', stepLeftOrRight);

function stepLeftOrRight(e){
	if(e.keyCode == 37){
		console.log("left");
		AvoidRainGame.Player.moveLeft();
	}
	if(e.keyCode == 39){
		console.log("right");
		AvoidRainGame.Player.moveRight();
	}
}

window.requestAnimationFrame(AvoidRainGame.drawAll);
////////
