class Ball {
	constructor (x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;

		this.dx = 5;
		this.dy = 2;
		this.paddles = null;

		this.jumpA = new Sound("Sounds/jump_1.wav");
		this.jumpB = new Sound("Sounds/jump_2.wav");
	}

	update() {
		this.#move();
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
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
}