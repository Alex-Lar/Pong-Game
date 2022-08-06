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
					break;
				case "KeyS":
					this.P1.down = true;
					break;
				case "ArrowUp":
					this.P2.up = true;			
					break;
				case "ArrowDown":
					this.P2.down = true;					
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