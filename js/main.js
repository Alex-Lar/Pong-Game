const restartBtn = document.getElementById('restart_btn')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200;

let continueAnimating = true;
let winValue = 10;

const playerOne = { 
	score: 0, 
	x: 30,
	y: window.innerHeight/2-75,
	width: 14,
	height: 110
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

const ball = new Ball(
	canvas.width/2, 
	window.innerHeight/2, 
	14
);

restartBtn.addEventListener('click', gameReset);

animate();
function gameReset() {
	document.location.reload();
}

function setGameInterface(x, y, text) {
	ctx.beginPath();
	ctx.font = "100px SF Atarian System";
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

function randInt(min, max) {
	let int = Math.floor(Math.random() * (max - min) + min);
	if (int !== 0) {
		return int;
	} else {
		return randInt(min, max);
	}
}

function resetBall() {
	ball.x = canvas.width/2;
	ball.y = window.innerHeight/2;
	ball.dy = randInt(-8, 8);
}

function gameState() {
	const touched = {
		rightEdge: ball.x + ball.r > canvas.width,
		leftEdge: ball.x - ball.r < 0
	}
	if (touched.leftEdge) {
		resetBall();
		playerTwo.score += 1;
	}
	if (touched.rightEdge) {
		resetBall();
		playerOne.score += 1;
	}

	// if (playerTwo.score === 10 || playerOne.score === 10) {
	// 	playerOne.score = 0;
	// 	playerTwo.score = 0;
	// }	
	// if (playerTwo.score === winValue || playerOne.score === winValue) {
	// 	continueAnimating = false;
	// 	console.log('gameover');
	// }
}

function animate() {
	canvas.height = window.innerHeight;
	setBorderLine([20,40]);

	setGameInterface((canvas.width/2)/2, 130, `${playerOne.score}`);
	setGameInterface(canvas.width*3/4, 130, `${playerTwo.score}`);
	
	ball.draw(ctx);
	ball.update();

	paddles.drawPaddles(ctx);
	paddles.update();

	gameState();
	ball.paddles = paddles.getLocation();

	// if(!continueAnimating){return;}

	requestAnimationFrame(animate);
}

