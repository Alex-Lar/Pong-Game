class Controls {
	constructor() {
		this.P1 = {
			up: false,
			down: false
		}
		this.P2 = {
			up: false,
			down: false
		}

		this.#addKeyboardListeners();
	}

	#addKeyboardListeners() {
		document.onkeydown = event => {
			switch (event.code) {
				case "KeyW":
					this.P1.up = true;
					console.log('Player 1: KeyW');
					break;
				case "KeyS":
					this.P1.down = true;
					console.log('Player 1: KeyS');
					break;
				case "ArrowUp":
					this.P2.up = true;
					console.log('Player 2: ArrowUp');
					break;
				case "ArrowDown":
					this.P2.down = true;
					console.log('Player 2: ArrowDown');
					break;
			}
		}
		document.onkeyup = (event) => {
			switch (event.code) {
				case "KeyW":
					this.P1.up = false;
					break;
				case "KeyS":
					this.P1.down = false;
					break;
				case "ArrowUp":
					this.P2.up = false;
					break;
				case "ArrowDown":
					this.P2.down = false;
					break;
			}
		}
	}
}