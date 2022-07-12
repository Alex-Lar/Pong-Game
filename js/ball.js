class Ball {
	constructor (x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;

		this.dx = 8;
		this.dy = 3;
		this.acceleration = 0.2;
	}

	update() {
		this.#move();
	}

	#move() {
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
		}
		if (touched.topEdge || touched.bottomEdge) {
			this.dy = -this.dy;
		}
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
}