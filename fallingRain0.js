var AvoidRainGame = {};
var canvas= document.querySelector('.canvas');
var ctx = canvas.getContext('2d');

//rain
AvoidRainGame.Rain = (function(){
	var color = '#F0E3FF';
	var rainPosX = 0;
	var rainPosY = 5;
	var fallAmount =3;
	var rainRadius = 5;
	var startAngle = 0;
	var endAngle = 2* Math.PI;

	return{
		setRainPosX: function(){
			return rand(0, canvas.width);
		},
		isFalling: function(){
			if(rainPosY < canvas.height){
				return rainPosY = rainPosY + fallAmount;
			}else{
				//add point
				//delete rain
				console.log("end");
				return;
			}
		},
		draw: function(){
			// var context = AvoidRainGame.Map.getContext();
			this.setRainPosX();
            ctx.beginPath();
            ctx.arc(this.setRainPosX(), rainPosY, rainRadius, startAngle, endAngle);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
		},
	}
})();

//character
AvoidRainGame.Player = (function(){
	var playerHeight = 100;
	var playerPosX = canvas.width/2;
	var playerPosY = canvas.height - playerHeight;
	var step = 5;

	return{
		moveLeft: function(){
			return playerPosX = playerPosX - step;
		},
		moveRight: function(){
			return playerPosX = playerPosX + step;
		},
		draw: function(){
			ctx.beginPath();
		    ctx.fillStyle = '#9C2765';
		    ctx.fillRect(playerPosX, playerPosY, 20, playerHeight);
		    ctx.closePath();
		},
		getPlayerPosX: function(){
			return this.playerPosX;
		},
	}

})();

AvoidRainGame.drawAll = function(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	AvoidRainGame.Rain.isFalling();
	AvoidRainGame.Rain.draw();
	AvoidRainGame.Player.draw();
	if(gameStatus == true){
		AvoidRainGame.requestAnimationFrame = window.requestAnimationFrame(AvoidRainGame.drawAll);
	}else{
		window.cancelAnimationFrame(AvoidRainGame.requestAnimationFrame);
	}
};

function rand(min, max){
	return (Math.random()*(max -min) + min);
};

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
//////
