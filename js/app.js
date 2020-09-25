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
		this.lateral = [
			[0, 1, 2],
			[6, 7, 8],
			[0, 3, 6],
			[2, 5, 8],
		];
		this.diagonals = [
			[0, 4, 8],
			[2, 4, 6],
		];
		this.buttonsChecked = [false, false, false, false, false, false, false, false, false];
		this.corners = [0, 2, 6, 8];
		this.centerOfLine = [1, 3, 5, 7];
		this.singlePlayer = true;
		this.optionsSelectedPlayer1 = [];
		this.optionsSelectedPlayer2 = [];
		this.addButtonEvent();
	}

	verifyChecked() {
		for (let i = 0; i < this.buttonsChecked.length; i++) {
			if (this.buttons[i].innerText != "") {
				this.buttonsChecked[i] = true;
			} else {
				this.buttonsChecked[i] = false;
			}
		}
	}

	addButtonEvent() {
		this.buttons = document.querySelectorAll("#buttonWrapper > button");
		this.player = 0;
		this.buttons.forEach((button) => {
			button.addEventListener("click", this.selectedFunction);
		});
	}

	selectedFunction = (even) => {
		const e = even;
		if (this.singlePlayer) {
			console.log(this.player);
			if (this.player % 2 == 0) {
				e.target.innerText = "x";
				this.optionsSelectedPlayer1.push(parseInt(e.target.value));
				e.target.removeEventListener("click", this.selectedFunction);
			} else {
				this.automaticMove();
			}
		} else {
			console.log("else");
			if (this.player % 2 == 0) {
				e.target.innerText = "X";
				this.optionsSelectedPlayer1.push(parseInt(e.target.value));
			} else {
				e.target.innerText = "O";
				this.optionsSelectedPlayer2.push(parseInt(e.target.value));
			}
			e.target.removeEventListener("click", this.selectedFunction);
		}
		this.player++;
		if (this.singlePlayer) {
			if (this.player % 2 == 1) {
				this.selectedFunction(e);
			}
		}
		this.checkIfWin();
	};

	checkIfWin() {
		const winZone = document.querySelector("#optionsWrapper > h5");
		for (let iterator = 0; iterator < this.optionsToWin.length; iterator++) {
			const singleOption = this.optionsToWin[iterator];
			let counterP1 = 0;
			let counterP2 = 0;
			let breakLoop = false;
			for (let index = 0; index < singleOption.length; index++) {
				const optionNumber = singleOption[index];
				for (let i = 0; i < this.optionsSelectedPlayer1.length; i++) {
					if (optionNumber == this.optionsSelectedPlayer1[i]) {
						counterP1++;
					}
					if (counterP1 == 3) {
						winZone.innerText = "Player 1 win";
						breakLoop = true;
					}
					if (breakLoop) {
						break;
					}
				}
				for (let i = 0; i < this.optionsSelectedPlayer2.length; i++) {
					if (optionNumber == this.optionsSelectedPlayer2[i]) {
						counterP2++;
					}
					if (counterP2 == 3) {
						winZone.innerText = "Player 2 win";
						breakLoop = true;
					}
					if (breakLoop) {
						break;
					}
				}
				if (breakLoop) {
					break;
				}
			}
			if (breakLoop) {
				break;
			}
		}
	}

	automaticMove() {
		this.verifyChecked();
		if (this.player == 1) {
			this.firstMove();
			this.verifyChecked();
		} else {
			if (this.player == 3) {
				this.thirdMove();
			} else {
				this.lastsMoves();
				this.verifyChecked();
			}
		}
	}

	thirdMove() {
		if (this.optionsSelectedPlayer2[0] == 4) {
			this.lastsMoves();
			this.verifyChecked();
		} else {
			const leftoverCorners = this.corners.filter((corner) => {
				if (!this.buttonsChecked[corner]) {
					return true;
				} else {
					return false;
				}
			});
			const randomNumber = Math.random();
			let possibleSolutions = false;
			this.diagonals.forEach((diagonal) => {
				let counter = 0;
				diagonal.forEach((singleNumber) => {
					if (this.buttonsChecked[singleNumber]) {
						counter++;
					}
				});
				if (counter == 3) {
					possibleSolutions = true;
				}
			});
			if (possibleSolutions) {
				for (let i = 0; i < leftoverCorners.length; i++) {
					if (randomNumber <= (1 / leftoverCorners.length) * (i + 1)) {
						this.selected(leftoverCorners[i]);
						break;
					}
				}
			} else {
				this.lastsMoves();
				this.verifyChecked();
			}
		}
	}

	firstMove() {
		if (this.optionsSelectedPlayer1[0] == 4) {
			const randomNumber = Math.random();
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
			this.optionsSelectedPlayer2.push(this.numberSelected);

			this.optionsToWin.forEach((singleOption) => {
				singleOption.forEach((singleNumber) => {
					if (singleNumber == this.numberSelected) {
						this.buttons[this.numberSelected].innerText = "O";
						this.buttons[this.numberSelected].removeEventListener("click", this.selectedFunction);
					}
				});
			});
		} else {
			this.selected(4);
		}
	}

	selected(position) {
		this.optionsSelectedPlayer2.push(position);
		this.buttons[position].innerText = "O";
		this.buttons[position].removeEventListener("click", this.selectedFunction);
		this.verifyChecked();
	}

	remainingOptions() {
		const remainingOptions = [];
		this.optionsToWin.forEach((option) => {
			let counter = 0;
			option.forEach((singleNumber) => {
				if (!this.buttonsChecked[singleNumber]) {
					counter++;
				}
			});
			if (counter >= 2) {
				if (counter == 3) {
					remainingOptions.push(option);
				} else {
					option.forEach((singleNumber) => {
						if (this.buttonsChecked[singleNumber]) {
							if (this.buttons[singleNumber].innerText == "O") {
								remainingOptions.push(option);
							}
						}
					});
				}
			}
		});
		return remainingOptions;
	}

	lastsMoves() {
		let moveToWin = undefined;
		this.optionsToWin.forEach((SingleOption) => {
			let counter = 0;
			SingleOption.forEach((singleNumber) => {
				this.optionsSelectedPlayer2.forEach((selectedNumber) => {
					if (singleNumber == selectedNumber) {
						counter++;
					}
				});
			});
			if (counter >= 2) {
				SingleOption.forEach((singleNumber) => {
					if (!this.buttonsChecked[singleNumber]) {
						moveToWin = singleNumber;
					}
				});
			}
		});
		if (moveToWin != undefined) {
			this.selected(moveToWin);
		} else {
			let singleOption;
			let possibilities;
			let thisCase = false;
			for (let i = 0; i < this.optionsToWin.length; i++) {
				singleOption = this.optionsToWin[i];
				possibilities = [];
				let counter = 0;
				for (let i = 0; i < singleOption.length; i++) {
					let singleNumber = singleOption[i];
					for (let i = 0; i < this.optionsSelectedPlayer1.length; i++) {
						let selectedNumber = this.optionsSelectedPlayer1[i];
						if (singleNumber == selectedNumber) {
							switch (singleOption.indexOf(selectedNumber)) {
								case 0:
									possibilities.push(0);
									break;
								case 1:
									possibilities.push(1);
									break;
								case 2:
									possibilities.push(2);
									break;

								default:
									break;
							}
							counter++;
						}
						if (counter == 2) {
							for (let i = 0; i < 3; i++) {
								if (!possibilities.includes(i)) {
									if (!this.buttonsChecked[singleOption[i]]) {
										thisCase = true;
										this.selected(singleOption[i]);
									}
								}
							}
						}
					}
				}
			}
			if (!thisCase) {
				const possibilities = [];
				const freeOptions = [];
				this.optionsToWin.forEach((option) => {
					if (option.includes(4)) {
						possibilities.push(option);
					}
				});
				possibilities.forEach((singleOption) => {
					let counter = 0;
					singleOption.forEach((singleNumber) => {
						if (!this.buttonsChecked[singleNumber]) {
							counter++;
						}
					});
					if (counter == 2) {
						freeOptions.push(singleOption);
					}
				});
				const validateOptions = freeOptions.filter((singleOption) => {
					if (singleOption.includes(2 && 4 && 6) || singleOption.includes(0 && 4 && 8)) {
						return false;
					} else {
						return true;
					}
				});
				if (validateOptions.length != 0) {
					const randomNumber = Math.random();
					let position = 0;
					validateOptions.forEach((singleOption, i) => {
						let options = [];
						if (randomNumber <= (1 / validateOptions.length) * (i + 1)) {
							singleOption.forEach((singleNumber) => {
								if (!this.buttonsChecked[singleNumber]) {
									options.push(singleNumber);
								}
							});
							for (let i = 0; i < options.length; i++) {
								if (randomNumber <= (1 / options.length) * (i + 1)) {
									position = options[i];
									break;
								}
							}
						}
					});
					this.selected(position);
				} else {
					const residual = this.centerOfLine.filter((center) => {
						if (this.buttonsChecked[center]) {
							return true;
						} else {
							return false;
						}
					});
					const lateral = this.lateral.filter((singleOption) => {
						for (let i = 0; i < residual.length; i++) {
							if (singleOption.includes(residual[i])) {
								return true;
							}
						}
					});
					let position = 0;
					lateral[0].forEach((singleLateral1) => {
						lateral[1].forEach((singleLateral2) => {
							if (singleLateral1 == singleLateral2) {
								position = singleLateral2;
							}
						});
					});
					if (this.buttonsChecked[position]) {
						const remainingOptions = [];
						this.buttonsChecked.forEach((button, i) => {
							if (!button) {
								remainingOptions.push(i);
							}
						});
						const randomNumber = Math.random();
						for (let i = 0; i < remainingOptions.length; i++) {
							if (randomNumber <= (1 / remainingOptions.length) * (i + 1)) {
								this.selected(remainingOptions[i]);
								break;
							} else {
								console.log("There are an error");
							}
						}
					} else {
						this.selected(position);
					}
					const remainingOptions = this.remainingOptions();
				}
			}
		}
	}
}

class Restart {
	constructor() {
		const restart = document.querySelector("#optionsWrapper > .clear");
		restart.addEventListener("click", this.restartEvent);
	}
	restartEvent() {
		let winZone = document.querySelector("#optionsWrapper > h5");
		tictactoe.addButtonEvent();
		tictactoe.optionsSelectedPlayer1 = [];
		tictactoe.optionsSelectedPlayer2 = [];
		tictactoe.player = 0;
		winZone.innerText = "";
		tictactoe.buttons.forEach((button) => {
			button.innerText = "";
		});
	}
}

class SinglePlayer {
	constructor() {
		const singlePlayer = document.querySelector("#optionsWrapper > .playAlone");
		singlePlayer.addEventListener("click", () => {
			restart.restartEvent();
			tictactoe.singlePlayer = !tictactoe.singlePlayer;
			if (singlePlayer.innerText == "Play with a friend") {
				singlePlayer.innerText = "Play Alone";
			} else {
				singlePlayer.innerText = "Play with a friend";
			}
		});
	}
}

var tictactoe = new TicTacToe();
const restart = new Restart();
const singlePlayer = new SinglePlayer();
