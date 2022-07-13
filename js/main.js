const canvas = document.getElementById('myCanvas');
canvas.width = 1500;
const ctx = canvas.getContext('2d');

let playerOne = 0;
let playerTwo = 0;

const ball = new Ball(canvas.width/2, window.innerHeight/2, 25);

animate();
function setGameInterface(x, y, text) {
	ctx.beginPath();
	ctx.font = "150px Retro Gaming";
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

	setGameInterface((canvas.width/2)/2, 150, `${playerOne}`);
	setGameInterface(canvas.width*3/4, 150, `${playerTwo}`);
	
	ball.draw(ctx);
	ball.update();

	requestAnimationFrame(animate);
}