class Ball {
	constructor (x, y, width, height, audio = false) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.audio = audio;
		
		this.speedX = this.#randomDirection(-3, 3);
		this.dx = this.speedX;
		this.dy = this.#randomDirection(-3, 3); 

		this.paddles = null;

		this.jumpA = new Sound("src/audio/jump_1.wav");
		this.jumpB = new Sound("src/audio/jump_2.wav");
	}

	#randomDirection(min, max) {
		let num = Math.floor(Math.random() * (2 - 0) + 0);
		return num === 0 ? min : max;
	}

	update() {
		this.#move();
	}

	#makeSound(x) {
		if (!this.audio) { 
			return 0;
		}

		switch(x) {
			case "A":
				this.jumpA.play();
				break;
			case "B":
				this.jumpB.play();
				break;
		}
	}

	#speedUp(speedX) {
		return Math.sign(speedX) === -1 ? -(Math.abs(speedX)+0.7) : Math.abs(speedX)+0.7;
	}

	#collisionDetection() {
		const touched = {
			P1: {
				rightEdge: this.x - 1 < this.paddles.P1.x + this.paddles.width,
				leftEdge: this.x + 1 > this.paddles.P1.x,
				topEdge: this.y + this.height > this.paddles.P1.y + 2,
				bottomEdge: this.y - 1 < this.paddles.P1.y + this.paddles.height,
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
				rightEdge: this.x < this.paddles.P2.x + this.paddles.width,
				leftEdge: this.x + this.width + 1 > this.paddles.P2.x,
				topEdge: this.y + this.height > this.paddles.P2.y + 2,
				bottomEdge: this.y < this.paddles.P2.y + this.paddles.height,
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

			this.dx *= -1;
		}
	}

	#move() {
		this.condition = false;
		this.x += this.dx;
		this.y += this.dy;

		const touched = {
			topEdge: this.y < 0,
			bottomEdge: this.y + this.height > canvas.height,
			rightEdge: this.x > canvas.width,
			leftEdge: this.x < 0
		}

		if (touched.rightEdge || touched.leftEdge) {
			this.dx = -this.dx;
			this.#makeSound('A');
		}
		if (touched.topEdge || touched.bottomEdge) {
			this.dy = -this.dy;
			this.#makeSound('A');
		}

		if (this.paddles !== null) {
			this.#collisionDetection();
		}
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = 'white';
		ctx.fill();
	}
}