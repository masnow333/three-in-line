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
		this.addButtonEvent();
	}

	verifyChecked() {
		for (let i = 0; i < this.buttonsChecked.length; i++) {
			if (this.buttons[i].innerText != "") {
				this.buttonsChecked[i] = true;
			}
		}
	}

	addButtonEvent() {
		this.buttons = document.querySelectorAll("#buttonWrapper > button");
		this.optionsSelectedPlayer1 = [];
		this.optionsSelectedPlayer2 = [];
		this.player = 0;
		this.selectedFunction = (e) => {
			this.verifyChecked();
			if (this.singlePlayer) {
				if (this.player % 2 == 0) {
					e.target.innerText = "x";
					this.optionsSelectedPlayer1.push(parseInt(e.target.value));
					e.target.removeEventListener("click", this.selectedFunction);
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
				e.target.removeEventListener("click", this.selectedFunction);
			}
			this.player++;
			if (this.player % 2 == 1) {
				this.selectedFunction();
			}
			this.checkIfWin();
		};
		this.buttons.forEach((button) => {
			button.addEventListener("click", this.selectedFunction);
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
			this.firstMove();
			this.verifyChecked();
		} else {
			if (this.player == 3) {
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
					this.diagonals.forEach((diagonal) => {
						let counter = 0;
						diagonal.forEach((singleNumber) => {
							if (this.buttonsChecked[singleNumber]) {
								counter++;
							}
						});
						if (counter == 3) {
							for (let i = 0; i < leftoverCorners.length; i++) {
								if (randomNumber <= (1 / leftoverCorners.length) * (i + 1)) {
									this.selected(leftoverCorners[i]);
									break;
								}
							}
						}
					});
				}
				console.log(this.player);
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

	thirdMove() {}

	lastsMoves() {
		let moveToWin = undefined;
		this.optionsToWin.forEach((singleOption) => {
			let counter = 0;
			singleOption.forEach((singleNumber) => {
				this.optionsSelectedPlayer2.forEach((selectedNumber) => {
					if (singleNumber == selectedNumber) {
						counter++;
					}
				});
			});
			if (counter >= 2) {
				singleOption.forEach((singleNumber) => {
					if (!this.buttonsChecked[singleNumber]) {
						moveToWin = singleNumber;
					}
				});
			}
		});

		if (moveToWin != undefined) {
			this.selected(moveToWin);
		} else {
			this.case = false;
			principalLoop: for (let i = 0; i < this.optionsToWin.length; i++) {
				this.lastsMoves.singleOption = this.optionsToWin[i];
				this.lastsMoves.counterP1 = 0;
				this.possibilitiesP1 = [];
				for (let i = 0; i < this.lastsMoves.singleOption.length; i++) {
					this.lastsMoves.singleNumber = this.lastsMoves.singleOption[i];
					for (let i = 0; i < this.optionsSelectedPlayer1.length; i++) {
						this.lastsMoves.selectedNumber = this.optionsSelectedPlayer1[i];
						if (this.lastsMoves.singleNumber == this.lastsMoves.selectedNumber) {
							switch (this.lastsMoves.singleOption.indexOf(this.lastsMoves.selectedNumber)) {
								case 0:
									this.possibilitiesP1.push(0);
									break;
								case 1:
									this.possibilitiesP1.push(1);
									break;
								case 2:
									this.possibilitiesP1.push(2);
									break;

								default:
									break;
							}
							this.lastsMoves.counterP1++;
							if (this.lastsMoves.counterP1 == 2) {
								for (let i = 0; i < 3; i++) {
									if (!this.possibilitiesP1.includes(i)) {
										if (!this.buttonsChecked[this.lastsMoves.singleOption[i]]) {
											this.case = true;
											this.position = this.lastsMoves.singleOption[i];
											this.selected(this.position);
											console.log(this.buttons[this.position], "perro");
										}
									}
								}
							}
						}
					}
				}
			}
			if (!this.case) {
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
						console.log(remainingOptions);
					} else {
						this.selected(position);
					}
					const remainingOptions = this.remainingOptions();
					console.log(remainingOptions, "loro");
					console.log(lateral, "perro");
					console.log(position, "Gato");
				}
			}
		}
	}
}

const tictactoe = new TicTacToe();
