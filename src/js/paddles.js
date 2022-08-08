class Paddles {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speedP1;
		this.speedP2;
		this.maxSpeed = 11;
		this.acceleration = 1;

		let [p1x, p2x] = this.x;
		let [p1y, p2y] = this.y;
		this.p1x = p1x;
		this.p1y = p1y;
		this.p2x = p2x;
		this.p2y = p2y;

		this.controls = new Controls();
	}

	update() {
		this.#moveP1();
		this.#moveP2();
	}

	#moveP1() {
		if (this.controls.P1.up && !(this.p1y < 2)) {
			this.p1y -= this.speedP1;
		}
		if (this.controls.P1.down && !(this.p1y + this.height > canvas.height + 2)) {
			this.p1y += this.speedP1;
		}
		if (this.speedP1 > this.maxSpeed) {
			this.speedP1 = this.maxSpeed;
		}
		if (!this.controls.P1.up && !this.controls.P1.down) {
			this.speedP1 = 0;
		}

		this.speedP1 += this.acceleration;
	}

	#moveP2() {
		if (this.controls.P2.up && !(this.p2y < 2)) {
			this.p2y -= this.speedP2;
		}
		if (this.controls.P2.down && !(this.p2y + this.height > canvas.height + 2)) {
			this.p2y += this.speedP2;
		}
		if (this.speedP2 > this.maxSpeed) {
			this.speedP2 = this.maxSpeed;
		}
		if (!this.controls.P2.up && !this.controls.P2.down) {
			this.speedP2 = 0;
		}

		this.speedP2 += this.acceleration;
	}

	getLocation() {
		return {
			P1: {
				x: this.p1x,
				y: this.p1y
			},
			P2: {
				x: this.p2x,
				y: this.p2y
			},
			width: this.width,
			height: this.height
		};
	}

	#drawP1(ctx) {
		ctx.beginPath();
		ctx.rect(this.p1x, this.p1y, this.width, this.height);
		ctx.fillStyle = 'white';
		ctx.fill();
	}

	#drawP2(ctx) {
		ctx.beginPath();
		ctx.rect(this.p2x, this.p2y, this.width, this.height);
		ctx.fillStyle = 'white';
		ctx.fill();
	}

	drawPaddles(ctx) {
		this.#drawP1(ctx);
		this.#drawP2(ctx);
	}
}