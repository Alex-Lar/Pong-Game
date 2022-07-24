class GameState {
	constructor(ball, paddles, playerOne, playerTwo, maxScore, restartBtn) {
		this.ball = ball;
		this.paddles = paddles;
		this.playerOne = playerOne;
		this.playerTwo = playerTwo;
		this.maxScore = maxScore;
		this.restartBtn = restartBtn;

		this.hasWinner = false;
		this.pause = false;
	}

	#getDirection(player) {
		const canvasParts = {
			one: canvas.height / 3,
			two: canvas.height / 3 * 2,
			three: canvas.height,
		}

		if (player === 'P1') {
			if (this.paddles.p1y > -15 && this.paddles.p1y < canvasParts.one) {
				return -4;
			}
			if (this.paddles.p1y > canvasParts.one && this.paddles.p1y < canvasParts.two) {
				return 0;
			}
			if (this.paddles.p1y > canvasParts.two && this.paddles.p1y < canvasParts.three + 15) {
				return 4;
			}
		}
		if (player === 'P2') {
			if (this.paddles.p2y > -15 && this.paddles.p2y < canvasParts.one) {
				return -4;
			}
			if (this.paddles.p2y > canvasParts.one && this.paddles.p2y < canvasParts.two) {
				return 0;
			}
			if (this.paddles.p2y > canvasParts.two && this.paddles.p2y < canvasParts.three + 15) {
				return 4;
			}
		}
	}

	#resetBall(player) {
		this.ball.dy = this.#getDirection(player);
		this.ball.x = canvas.width / 2;
		this.ball.y = window.innerHeight / 2;
		this.ball.speedX = Math.sign(this.ball.speedX) === -1 ? -5 : 5;
	}

	#getPoints() {
		const touched = {
			rightEdge: this.ball.x + this.ball.r > canvas.width,
			leftEdge: this.ball.x - this.ball.r < 0
		}
		if (touched.leftEdge) {
			this.#resetBall('P2');
			this.playerTwo.score += 1;
		}
		if (touched.rightEdge) {
			this.#resetBall('P1');
			this.playerOne.score += 1;
		}
		if (this.playerOne.score === this.maxScore) {
			this.playerOne.winner = true;
			this.hasWinner = true
		}
		if (this.playerTwo.score === this.maxScore) {
			this.playerTwo.winner = true;
			this.hasWinner = true
		}

		this.#displayScores((canvas.width/2)/2, 130, `${this.playerOne.score}`);
		this.#displayScores(canvas.width*3/4, 130, `${this.playerTwo.score}`);
	}

	#displayScores(x, y, text) {
		ctx.beginPath();
		ctx.font = "110px SF Atarian System";
		ctx.fillStyle = 'white';
		ctx.textAlign = "center";
		ctx.fillText(text, x, y);
	}

	#displayResults(x, y, text) {
		ctx.beginPath();
		ctx.font = "80px SF Atarian System";
		ctx.fillStyle = 'white';
		ctx.textAlign = "center";
		ctx.fillText(text, x, y);
	}

	#defineWord(player) {
		if (player.winner) {
			return "Winner";
		} 
		return "Loser";	
	}

	#gameOver() {
		this.restartBtn.classList.remove('hide');
		this.restartBtn.classList.add('show');
		this.#displayScores((canvas.width/2)/2, 130, `${this.playerOne.score}`);
		this.#displayScores(canvas.width*3/4, 130, `${this.playerTwo.score}`);

		this.#displayResults((canvas.width/2)/2, canvas.height/2, this.#defineWord(this.playerOne));
		this.#displayResults(canvas.width*3/4, canvas.height/2, this.#defineWord(this.playerTwo));

		this.pause = true;
	}

	defineGameState() {
		if (!this.hasWinner) {
			this.#getPoints();
		}

		if (this.hasWinner) {
			this.#gameOver();
		}
	}
}