class TicTacToe {
	constructor() {
		this.optionsToWin = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		this.corners = [0, 2, 6, 8];
		this.centerOfLine = [1, 3, 5, 7];
		this.singlePlayer = true;
		this.addButtonEvent();
	}

	addButtonEvent() {
		this.buttons = document.querySelectorAll("#buttonWrapper > button");
		this.optionsSelectedPlayer1 = [];
		this.optionsSelectedPlayer2 = [];
		this.player = 0;
		const selectedFunction = (e) => {
			if (this.singlePlayer) {
				if (this.player % 2 == 0) {
					e.target.innerText = "x";
					this.optionsSelectedPlayer1.push(parseInt(e.target.value));
				} else {
					this.automaticMove();
				}
			} else {
				if (this.player % 2 == 0) {
					e.target.innerText = "X";
					this.optionsSelectedPlayer1.push(parseInt(e.target.value));
				} else {
					e.target.innerText = "O";
					this.optionsSelectedPlayer2.push(parseInt(e.target.value));
				}
				e.target.removeEventListener("click", selectedFunction);
			}
			this.player++;
			console.log(this.player);
			this.checkIfWin();
			if (this.player % 2 == 1) {
				selectedFunction();
			}
		};
		this.buttons.forEach((button) => {
			button.addEventListener("click", selectedFunction);
		});
	}

	checkIfWin() {
		this.optionsToWin.forEach((singleOption) => {
			let counterP1 = 0;
			let counterP2 = 0;
			singleOption.forEach((optionNumber) => {
				this.optionsSelectedPlayer1.forEach((option) => {
					if (optionNumber == option) {
						counterP1++;
						if (counterP1 == 3) {
							alert("Player 1 win");
						}
					}
				});
				this.optionsSelectedPlayer2.forEach((option) => {
					if (optionNumber == option) {
						counterP2++;
						if (counterP2 == 3) {
							alert("Player 2 win");
						}
					}
				});
			});
		});
	}

	automaticMove() {
		if (this.player == 1) {
			if (this.optionsSelectedPlayer1[0] == 4) {
				const randomNumber = Math.random();
				console.log(randomNumber);
				for (let i = 0; i <= 3; i++) {
					if (randomNumber <= 0.25 * (i + 1)) {
						this.numberSelected = this.corners[i];
						break;
					} else {
						if (i == 3) {
							console.log("You have an error in the Math.random");
						}
					}
				}
				console.log(this.numberSelected);
				this.optionsSelectedPlayer2.push(this.numberSelected);

				this.optionsToWin.forEach((singleOption) => {
					singleOption.forEach((singleNumber) => {
						if (singleNumber == this.numberSelected) {
							this.buttons[this.numberSelected].innerText = "O";
							this.buttons[this.numberSelected].removeEventListener(
								"click",
								this.addButtonEvent.selectedFunction
							);
						}
					});
				});
			} else {
				this.optionsSelectedPlayer2.push(4);
				this.buttons[4].innerText = "O";
				this.buttons[4].removeEventListener(
					"click",
					this.addButtonEvent.selectedFunction
				);
			}
		}
	}
}

const tictactoe = new TicTacToe();
