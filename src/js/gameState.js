class GameState {
	constructor(ball, paddles, playersInfo, maxScore, restartBtn) {
		this.ball = ball;
		this.paddles = paddles;
		this.playersInfo = playersInfo;
		this.maxScore = maxScore;
		this.restartBtn = restartBtn;

		this.hasWinner = false;
		this.pause = false;
	}

	#randomDirection(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	#resetBall() {
		this.ball.dy = this.#randomDirection(-8, 8);
		this.ball.x = canvas.width / 2;
		this.ball.y = window.innerHeight / 2;
		this.ball.speedX = Math.sign(this.ball.dx) === -1 ? 5 : -5;
		this.ball.dx = this.ball.speedX;
	}

	#getPoints() {
		const touched = {
			rightEdge: this.ball.x + this.ball.width + 1 > canvas.width,
			leftEdge: this.ball.x - 1 < 0
		}
		if (touched.leftEdge) {
			this.#resetBall();
			this.playersInfo.p2.score += 1;
		}
		if (touched.rightEdge) {
			this.#resetBall();
			this.playersInfo.p1.score += 1;
		}
		if (this.playersInfo.p1.score === this.maxScore) {
			this.playersInfo.p1.winner = true;
			this.hasWinner = true
		}
		if (this.playersInfo.p2.score === this.maxScore) {
			this.playersInfo.p2.winner = true;
			this.hasWinner = true
		}

		this.#displayScores((canvas.width / 2) / 2, 130, `${this.playersInfo.p1.score}`);
		this.#displayScores(canvas.width * 3 / 4, 130, `${this.playersInfo.p2.score}`);
	}

	#displayScores(x, y, text) {
		ctx.beginPath();
		ctx.font = "110px SF Atarian System";
		ctx.fillStyle = 'white';
		ctx.textAlign = "center";
		ctx.fillText(text, x, y);
	}

	#displayLoserOrWinner(x, y, text) {
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
		
		this.#displayScores((canvas.width / 2) / 2, 130, `${this.playersInfo.p1.score}`);
		this.#displayScores(canvas.width * 3 / 4, 130, `${this.playersInfo.p2.score}`);

		this.#displayLoserOrWinner(
			(canvas.width / 2) / 2,
			canvas.height / 2,
			this.#defineWord(this.playersInfo.p1)
		);
		this.#displayLoserOrWinner(
			canvas.width * 3 / 4,
			canvas.height / 2,
			this.#defineWord(this.playersInfo.p2)
		);

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