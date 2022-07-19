const canvas = document.getElementById('myCanvas');
canvas.width = 1400;
const ctx = canvas.getContext('2d');

const playerOne = { score: 0, x: 30,
	y: window.innerHeight/2-75,
	width: 15,
	height: 140
}
const playerTwo = {
	score: 0, 
	x: canvas.width - 50, 
	y: window.innerHeight/2-75 
}

const paddles = new Paddles(
	[playerOne.x, playerTwo.x], 
	[playerOne.y, playerTwo.y], 
	playerOne.width, 
	playerOne.height
);
const ball = new Ball(canvas.width/2, window.innerHeight/2, 20);

animate();
function setGameInterface(x, y, text) {
	ctx.beginPath();
	ctx.font = "110px Retro Gaming";
	ctx.fillStyle = 'white';
	ctx.textAlign = "center";
	ctx.fillText(text, x, y);
}

function setBorderLine(pattern) {
	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.setLineDash(pattern);
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2,  canvas.height);
	ctx.stroke();
}

function animate() {
	canvas.height = window.innerHeight;
	setBorderLine([40,40]);

	setGameInterface((canvas.width/2)/2, 130, `${playerOne.score}`);
	setGameInterface(canvas.width*3/4, 130, `${playerTwo.score}`);
	
	ball.draw(ctx);
	ball.update();

	paddles.drawPaddles(ctx);
	paddles.update();
	
	ball.paddles = paddles.getLocation();

	requestAnimationFrame(animate);
}