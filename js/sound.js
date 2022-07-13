class Sound{
	constructor(src) {
		this.src = src;
		
		this.sound = new Audio(this.src);
		this.sound.volume = 0.2;

		this.button = document.createElement('button');
		this.button.style.display = "none";
	}

	play() {
		document.body.appendChild(this.button);
		this.button.addEventListener("click", () => {
			this.sound.play();
		});
		this.button.click();
		this.button.remove();
	}
}