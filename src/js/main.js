const restartBtn = document.getElementById('restart_btn')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200;

restartBtn.addEventListener('click', gameReset);

const settings = {
	maxScore: 6,
	audio: false
}

const playersInfo = {
	p1: {
		score: 0,
		winner: false,
		x: 30
	},
	p2: {
		score: 0,
		winner: false,
		x: canvas.width - 50
	},
	common: {
		y: window.innerHeight / 2 - 55,
		width: 14,
		height: 110
	}
}

const paddles = new Paddles(
	[playersInfo.p1.x, playersInfo.p2.x],
	[playersInfo.common.y, playersInfo.common.y],
	playersInfo.common.width,
	playersInfo.common.height
);

const ball = new Ball(
	canvas.width / 2,
	window.innerHeight / 2,
	15,
	15,
	settings.audio
);

const gameState = new GameState(ball, paddles, playersInfo, settings.maxScore, restartBtn);


animate();
function gameReset() {
	document.location.reload();
}

function setBorderLine(pattern) {
	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.setLineDash(pattern);
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();
}


function animate() {
	canvas.height = window.innerHeight;
	setBorderLine([20, 40]);

	ball.draw(ctx);
	ball.update();

	paddles.drawPaddles(ctx);
	paddles.update();
	ball.paddles = paddles.getLocation();

	gameState.defineGameState();

	// if (gameState.pause) {
	// 	return;
	// }
	requestAnimationFrame(animate);
}

