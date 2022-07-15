class Paddles {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		let [p1x, p2x] = this.x;
		let [p1y, p2y] = this.y;
		let [p1width, p2width] = this.width;
		let [p1height, p2height] = this.height;

		console.log(' ');
		console.log(`x: ${this.x}`);
		console.log(`x1: ${p1x} x2: ${p2x}`);
		console.log(' ');
		console.log(`y: ${this.y}`);
		console.log(`y1: ${p1y} y2: ${p2y}`);
		console.log(' ');
		console.log(`width: ${this.width}`);
		console.log(`width1: ${p1width} width2: ${p2width}`);
		console.log(' ');
		console.log(`height: ${this.height}`);
		console.log(`height1: ${p1height} height2: ${p2height}`);
		console.log(' ');

		this.controls = new Controls();
	}

	update() {
		this.
		this.#move();
	}

	#move() {}

	// #eventListener() {
	// 	document.onkeydown = event => {
	// 		switch (event.code) {
	// 			case "KeyW":
	// 				this.P1.up = true;
	// 				console.log('Player 1: KeyW');
	// 				break;
	// 			case "KeyS":
	// 				this.P1.down = true;
	// 				console.log('Player 1: KeyS');
	// 				break;
	// 			case "ArrowUp":
	// 				this.P2.up = true;
	// 				console.log('Player 2: ArrowUp');
	// 				break;
	// 			case "ArrowDown":
	// 				this.P2.down = true;
	// 				console.log('Player 2: ArrowDown');
	// 				break;
	// 		}
	// 	}
	// 	document.onkeyup = (event) => {
	// 		switch (event.code) {
	// 			case "KeyW":
	// 				this.P1.up = false;
	// 				break;
	// 			case "KeyS":
	// 				this.P1.down = false;
	// 				break;
	// 			case "ArrowUp":
	// 				this.P2.up = false;
	// 				break;
	// 			case "ArrowDown":
	// 				this.P2.down = false;
	// 				break;
	// 		}
	// 	}
	// }


	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = 'white';
		ctx.fill();
	}
}