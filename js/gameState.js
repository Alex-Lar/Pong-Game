class GameState {
    constructor(ball, paddles, playerOne, playerTwo) {
        this.ball = ball;
        this.paddles = paddles;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }

    #getDirection(player) {
        const canvasParts = {
            one: canvas.height/3,
            two: canvas.height/3*2,
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
        this.ball.x = canvas.width/2;
        this.ball.y = window.innerHeight/2;
        this.ball.speedX = Math.sign(this.ball.speedX) === -1 ? -5 : 5;
    }

    defineState() {
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
    
        // if (playerTwo.score === 10 || playerOne.score === 10) {
        // 	playerOne.score = 0;
        // 	playerTwo.score = 0;
        // }	
        // if (playerTwo.score === winValue || playerOne.score === winValue) {
        // 	continueAnimating = false;
        // 	console.log('gameover');
        // }
    }
}