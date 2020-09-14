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
		this.buttonsChecked = [false, false, false, false, false, false, false, false, false];
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
			for (let i = 0; i < this.buttonsChecked.length; i++) {
				if (this.buttons[i].innerText != "") {
					this.buttonsChecked[i] = true;
				}
			}
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
			if (this.player % 2 == 1) {
				selectedFunction();
			}
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

	automaticMove() {
		if (this.player == 1) {
			this.firstMove();
		} else {
			this.lastsMoves();

			/* this.optionsToWin.forEach((singleOption) => {
        let counterP1 = 0;
        this.possibilitiesP1 = [];
        singleOption.forEach((singleNumber) => {
          this.optionsSelectedPlayer1.forEach((numberSelected) => {
            if (singleNumber == numberSelected) {
              switch (singleOption.indexOf(singleNumber)) {
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
                  console.log("You have an error in the switch of automaticMode p1");
                  break;
              }
              counterP1++;
              if (counterP1 == 2) {
                for (let i = 0; i < 3; i++) {
                  if (!this.possibilitiesP1.includes(i)) {
                    if (!this.buttonsChecked[singleOption[i]]) {
                      this.optionsSelectedPlayer2.push(singleOption[i]);
                      this.buttons[singleOption[i]].innerText = "O";
                      this.buttons[singleOption[i]].removeEventListener(
                        "click",
                        this.addButtonEvent.selectedFunction
                      );
                      console.log(singleOption[i], "perro");
                    } else {
                      this.optionsToWin.forEach((optionP2) => {
                        let counterP2 = 0;
                        this.possibilitiesP2 = [];
                        optionP2.forEach((singleNumberP2) => {
                          this.optionsSelectedPlayer2.forEach((selectedP2) => {
                            if (singleNumberP2 == selectedP2) {
                              switch (optionP2.indexOf(singleNumberP2)) {
                                case 0:
                                  this.possibilitiesP2.push(0);
                                  break;
                                case 1:
                                  this.possibilitiesP2.push(1);
                                  break;
                                case 2:
                                  this.possibilitiesP2.push(2);
                                  break;

                                default:
                                  console.log(
                                    "You have an error in the switch of automaticMode p2"
                                  );
                                  break;
                              }
                              counterP2++;
                              if (counterP2 == 2) {
                                for (let i = 0; i < 3; i++) {
                                  if (!this.possibilitiesP2.includes(i)) {
                                    if (!this.buttonsChecked[optionP2[i]]) {
                                      this.optionsSelectedPlayer2.push(optionP2[i]);
                                      this.buttons[optionP2[i]].innerText = "O";
                                      this.buttons[optionP2[i]].removeEventListener(
                                        "click",
                                        this.addButtonEvent.selectedFunction
                                      );
                                      console.log(singleOption[i], "perro");
                                    }
                                  }
                                }
                              }
                            }
                          });
                        });
                      });
                      console.log(this.buttonsChecked[singleOption[i]], "care pan");
                    }
                  }
                }
              } else {
                const remainingCenter = this.centerOfLine.filter((center) => {
                  if (!this.buttonsChecked[center]) {
                    return center;
                  }
                });
                const random = Math.random();
                console.log(random, "perro");
              }
            }
          });
        });
      }); */
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
			this.buttons[4].removeEventListener("click", this.addButtonEvent.selectedFunction);
		}
	}

	lastsMoves() {
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
										this.position = this.lastsMoves.singleOption[i];
										this.optionsSelectedPlayer2.push(this.position);
										this.buttons[this.position].innerText = "O";
										this.buttons[this.position].removeEventListener(
											"click",
											this.addButtonEvent.selectedFunction
										);
										console.log(this.buttons[this.position]);
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

const tictactoe = new TicTacToe();
