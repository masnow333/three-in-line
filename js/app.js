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
		this.addButtonEvent();
	}

	addButtonEvent() {
		this.buttons = document.querySelectorAll("#buttonWrapper > button");
		this.optionsSelectedPlayer1 = [];
		this.optionsSelectedPlayer2 = [];
		this.player = 0;
		const selectedFunction = (e) => {
			if (this.player % 2 == 0) {
				e.target.innerText = "X";
				this.optionsSelectedPlayer1.push(parseInt(e.target.value));
			} else {
				e.target.innerText = "O";
				this.optionsSelectedPlayer2.push(parseInt(e.target.value));
			}
			e.target.removeEventListener("click", selectedFunction);
			this.player++;
			console.log(this.player);
			this.checkIfWin();
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
}

const tictactoe = new TicTacToe();
