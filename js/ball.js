class Ball {
	constructor (x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		
		this.speedX = -5;
		this.dx = this.speedX;
		this.dy = 4;

		this.paddles = null;

		this.jumpA = new Sound("Sounds/jump_1.wav");
		this.jumpB = new Sound("Sounds/jump_2.wav");
	}

	update() {
		this.#move();
	}

	#speedUp(speedX) {
		return Math.sign(speedX) === -1 ? -(Math.abs(speedX)+0.2) : Math.abs(speedX)+0.2;
	}

	#collisionDetection() {
		const touched = {
			P1: {
				rightEdge: this.x - this.r < this.paddles.P1.x + this.paddles.width,
				leftEdge: this.x + this.r > this.paddles.P1.x,
				topEdge: this.y + this.r > this.paddles.P1.y + 2,
				bottomEdge: this.y - this.r < this.paddles.P1.y + this.paddles.height,
				quorter: {
					one: this.y < (this.paddles.P1.y + this.paddles.height/5) 
					&& this.y > this.paddles.P1.y,
	
					two: this.y < this.paddles.P1.y + (this.paddles.height/5*2) 
					&& this.y > this.paddles.P1.y + this.paddles.height/5,
	
					three: this.y < this.paddles.P1.y + (this.paddles.height/5*3) 
					&& this.y > this.paddles.P1.y + (this.paddles.height/5*2),
					
					four: this.y < this.paddles.P1.y + (this.paddles.height/5*4) 
					&& this.y > this.paddles.P1.y + (this.paddles.height/5*3),
	
					five: this.y < this.paddles.P1.y + (this.paddles.height) 
					&& this.y > this.paddles.P1.y + (this.paddles.height/5*4) 
				}
			},
			P2: {
				rightEdge: this.x - this.r < this.paddles.P2.x + this.paddles.width,
				leftEdge: this.x + this.r > this.paddles.P2.x,
				topEdge: this.y + this.r > this.paddles.P2.y + 2,
				bottomEdge: this.y - this.r < this.paddles.P2.y + this.paddles.height,
				quorter: {
					one: this.y < (this.paddles.P2.y + this.paddles.height/5) 
					&& this.y > this.paddles.P2.y,
	
					two: this.y < this.paddles.P2.y + (this.paddles.height/5*2) 
					&& this.y > this.paddles.P2.y + this.paddles.height/5,
	
					three: this.y < this.paddles.P2.y + (this.paddles.height/5*3) 
					&& this.y > this.paddles.P2.y + (this.paddles.height/5*2),
					
					four: this.y < this.paddles.P2.y + (this.paddles.height/5*4) 
					&& this.y > this.paddles.P2.y + (this.paddles.height/5*3),
	
					five: this.y < this.paddles.P2.y + (this.paddles.height) 
					&& this.y > this.paddles.P2.y + (this.paddles.height/5*4) 
				}
			}
		}
		if (touched.P1.rightEdge && touched.P1.leftEdge && touched.P1.topEdge && touched.P1.bottomEdge) {
			if (touched.P1.quorter.one) {
				this.dy = Math.sign(this.dy) === -1 ? -6 : 6;
			} 
			if (touched.P1.quorter.two) {
				this.dy = Math.sign(this.dy) === -1 ? -4 : 4;
			} 
			if (touched.P1.quorter.three) {
				this.dy = Math.sign(this.dy) === -1 ? -3 : 3;
			} 
			if (touched.P1.quorter.four) {
				this.dy = Math.sign(this.dy) === -1 ? -4 : 4;
			} 
			if (touched.P1.quorter.five) {
				this.dy = Math.sign(this.dy) === -1 ? -6 : 6;
			}

			this.speedX = this.#speedUp(this.speedX);

			this.dx = 0;
			this.dx = this.speedX;
			this.dx *= -1;
		}

		if (touched.P2.leftEdge && touched.P2.rightEdge && touched.P2.topEdge && touched.P2.bottomEdge) {
			if (touched.P2.quorter.one) {
				this.dy = Math.sign(this.dy) === -1 ? -6 : 6;
			} 
			if (touched.P2.quorter.two) {
				this.dy = Math.sign(this.dy) === -1 ? -4 : 4;
			} 
			if (touched.P2.quorter.three) {
				this.dy = Math.sign(this.dy) === -1 ? -3 : 3;
			} 
			if (touched.P2.quorter.four) {
				this.dy = Math.sign(this.dy) === -1 ? -4 : 4;
			} 
			if (touched.P2.quorter.five) {
				this.dy = Math.sign(this.dy) === -1 ? -6 : 6;
			}

			this.speedX = this.#speedUp(this.speedX);

			this.dx = 0;
			this.dx = this.speedX;
		}
	}

	#move() {
		this.condition = false;
		this.x += this.dx;
		this.y += this.dy;

		const touched = {
			topEdge: this.y - this.r < 0,
			bottomEdge: this.y + this.r > canvas.height,
			rightEdge: this.x + this.r > canvas.width,
			leftEdge: this.x - this.r < 0
		}

		if (touched.rightEdge || touched.leftEdge) {
			this.dx = -this.dx;
			// this.jumpA.play();
		}
		if (touched.topEdge || touched.bottomEdge) {
			this.dy = -this.dy;
			// this.jumpA.play();
		}

		if (this.paddles !== null) {
			this.#collisionDetection();
		}
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
}