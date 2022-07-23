const restartBtn = document.getElementById('restart_btn')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200;

restartBtn.addEventListener('click', gameReset);
function gameReset() {
	document.location.reload();
}

const settings = {
	maxScore: 10,
	audio: false
}
let continueAnimating = true;

const playerOne = { 
	score: 0, 
	x: 30,
	y: window.innerHeight/2-55,
	width: 14,
	height: 110
}

const playerTwo = {
	score: 0, 
	x: canvas.width - 50, 
	y: window.innerHeight/2-55 
}

const paddles = new Paddles(
	[playerOne.x, playerTwo.x], 
	[playerOne.y, playerTwo.y], 
	playerOne.width, 
	playerOne.height
);

const ball = new Ball(
	canvas.width/2, 
	window.innerHeight/2, 
	14,
	settings.audio
);

const gameState = new GameState(ball, paddles, playerOne, playerTwo);

animate();
function setGameInterface(x, y, text) {
	ctx.beginPath();
	ctx.font = "110px SF Atarian System";
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
	requestAnimationFrame(animate);

	canvas.height = window.innerHeight;
	setBorderLine([20,40]);
	setGameInterface((canvas.width/2)/2, 130, `${playerOne.score}`);
	setGameInterface(canvas.width*3/4, 130, `${playerTwo.score}`);
	
	ball.draw(ctx);
	ball.update();

	paddles.drawPaddles(ctx);
	paddles.update();
	ball.paddles = paddles.getLocation();

	gameState.defineState();

	// if(!continueAnimating){return;}
}

