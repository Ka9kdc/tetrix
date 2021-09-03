class Block {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.position = 1;
	}
	rotateLeft() {
		this.position++;
		if (this.position === 5) this.position = 1;
		this.rotateShape();
		return this;
	}

	rotateRight() {
		this.position--;
		if (this.position === 0) this.position = 4;
		this.rotateShape();
		return this;
	}
}

class Lblock extends Block {
	constructor(rowLength) {
		super(rowLength);
		this.shape = [
			[0, 6],
			[0, 5],
			[-1, 5],
			[-2, 5],
		];
		this.token = "l";
		this.color = "box green";
	}

	rotateShape() {
		let outofBoundslow = 0;
		let outofBoundshigh = 0;
		if (this.position === 1) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] + 1;
			if (this.shape[0][1] >= this.rowLength) outofBoundshigh++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] - 2;
			this.shape[3][1] = this.shape[1][1];
		} else if (this.position === 2) {
			this.shape[0][0] = this.shape[1][0] + 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			if (this.shape[2][1] >= this.rowLength) outofBoundshigh++;
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] + 2;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		} else if (this.position === 3) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] + 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] + 2;
			this.shape[3][1] = this.shape[1][1];
		} else if (this.position === 4) {
			this.shape[0][0] = this.shape[1][0] - 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] - 1;
			if (this.shape[2][1] < 0) outofBoundslow++;
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] - 2;
			if (this.shape[3][1] < 0) outofBoundslow++;
		}
		if (outofBoundshigh) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] -= outofBoundshigh;
			}
		} else if (outofBoundslow) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] += outofBoundslow;
			}
		}
		console.log(this.shape);
	}

	checkBelow(board) {
		if (this.position === 1) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
		} else if (this.position === 2) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[1][1]]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position === 3) {
			if (!board[this.shape[3][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position === 4) {
			if (!board[this.shape[3][0] + 1]) return true;
			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		}
		return false;
	}

	checkSide(direction, board) {
		if (direction === "left" && this.position === 1) {
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 1) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 2) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;
		} else if (direction === "right" && this.position === 2) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 3) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 3) {
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 4) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 4) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
		}
		return false;
	}
}

class Jblock extends Block {
	constructor(rowLength) {
		super(rowLength);
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[-2, 5],
		];
		this.token = "j";
		this.color = "box blue";
	}

	rotateShape() {
		let outofBoundslow = 0;
		let outofBoundshigh = 0;
		if (this.position === 1) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] - 2;
			this.shape[3][1] = this.shape[1][1];
		} else if (this.position === 2) {
			this.shape[0][0] = this.shape[1][0] - 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			if (this.shape[2][1] >= this.rowLength) outofBoundshigh++;
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] + 2;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		} else if (this.position === 3) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] + 1;
			if (this.shape[0][1] >= this.rowLength) outofBoundshigh++;
			this.shape[2][0] = this.shape[1][0] + 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] + 2;
			this.shape[3][1] = this.shape[1][1];
		} else if (this.position === 4) {
			this.shape[0][0] = this.shape[1][0] + 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] - 1;
			if (this.shape[2][1] < 0) outofBoundslow++;
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] - 2;
			if (this.shape[3][1] < 0) outofBoundslow++;
		}
		if (outofBoundshigh) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] -= outofBoundshigh;
			}
		} else if (outofBoundslow) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] += outofBoundslow;
			}
		}
	}

	checkBelow(board) {
		if (this.position === 1) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
		} else if (this.position === 2) {
			if (!board[this.shape[2][0] + 1]) return true;

			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position === 3) {
			if (!board[this.shape[3][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position === 4) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		}
		return false;
	}

	checkSide(direction, board) {
		if (direction === "left" && this.position === 1) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 1) {
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 2) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;
		} else if (direction === "right" && this.position === 2) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 3) {
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 3) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 4) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 4) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
		}
		return false;
	}
}

class Squareblock extends Block {
	constructor(rowLength) {
		super(rowLength);
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[-1, 4],
		];
		this.token = "=";
		this.color = "box red";
	}

	rotateShape() {
		return this;
	}

	checkBelow(board) {
		if (!board[this.shape[0][0] + 1]) return true;
		if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
		if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
		return false;
	}

	checkSide(direction, board) {
		if (direction === "left") {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else {
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
		}
		return false;
	}
}

class Lineblock extends Block {
	constructor(rowLength) {
		super(rowLength);
		this.shape = [
			[0, 5],
			[-1, 5],
			[-2, 5],
			[-3, 5],
		];
		this.token = "|";
		this.color = "box orange";
	}

	rotateShape() {
		let outofBoundshigh = 0;
		let outofBoundslow = 0;
		if (this.position === 2) {
			for (let i = 1; i < 4; i++) {
				let newColumn = this.shape[0][1] + i;
				if (this.rowLength <= newColumn) {
					outofBoundshigh++;
				}
				this.shape[i][0] = this.shape[0][0];
				this.shape[i][1] = newColumn;
			}
		} else if (this.position === 4) {
			for (let i = 1; i < 4; i++) {
				let newColumn = this.shape[0][1] - i;
				if (-1 >= newColumn) {
					outofBoundslow++;
				}
				this.shape[i][0] = this.shape[0][0];
				this.shape[i][1] = newColumn;
			}
		} else if (this.position % 2) {
			for (let i = 1; i < 4; i++) {
				let newColumn = this.shape[0][0] - i;
				this.shape[i][1] = this.shape[0][1];
				this.shape[i][0] = newColumn;
			}
		}
		if (outofBoundshigh) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] -= outofBoundshigh;
			}
		} else if (outofBoundslow) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] += outofBoundslow;
			}
		}
	}

	checkBelow(board) {
		if (this.position % 2) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
		} else {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		}
		return false;
	}

	checkSide(direction, board) {
		if (direction === "left" && this.position % 2) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position % 2) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left") {
			if (this.position === 2 && board[this.shape[0][0]][this.shape[0][1] - 1])
				return true;
			if (this.position === 4 && board[this.shape[3][0]][this.shape[3][1] - 1])
				return true;
		} else {
			if (this.position === 2 && board[this.shape[3][0]][this.shape[3][1] + 1])
				return true;
			if (this.position === 4 && board[this.shape[0][0]][this.shape[0][1] + 1])
				return true;
		}
		return false;
	}
}

class Tblock extends Block {
	constructor(rowLength) {
		super(rowLength);
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[0, 6],
		];
		this.token = "t";
		this.color = "box pink";
	}

	rotateShape() {
		let outofBoundshigh = 0;
		let outofBoundslow = 0;
		if (this.position === 1) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] + 1;
			if (this.shape[3][1] > this.rowLength) outofBoundshigh++;
		} else if (this.position === 2) {
			this.shape[0][0] = this.shape[1][0] - 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			if (this.shape[2][1] > this.rowLength) outofBoundshigh++;
			this.shape[3][0] = this.shape[1][0] + 1;
			this.shape[3][1] = this.shape[1][1];
		} else if (this.position === 3) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] + 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] + 1;
			if (this.shape[3][1] > this.rowLength) outofBoundshigh++;
		} else if (this.position === 4) {
			this.shape[0][0] = this.shape[1][0] - 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] - 1;
			if (this.shape[2][1] < 0) outofBoundslow++;
			this.shape[3][0] = this.shape[1][0] + 1;
			this.shape[3][1] = this.shape[1][1];
		}
		if (outofBoundshigh) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] -= outofBoundshigh;
			}
		} else if (outofBoundslow) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] += outofBoundslow;
			}
		}
	}

	checkBelow(board) {
		if (this.position === 1) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position === 3) {
			if (!board[this.shape[2][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position === 2) {
			if (!board[this.shape[3][0] + 1]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position === 4) {
			if (!board[this.shape[3][0] + 1]) return true;
			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		}
		return false;
	}
	checkSide(direction, board) {
		if (direction === "left" && this.position === 1) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
		} else if (direction === "right" && this.position === 1) {
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 2) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 2) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 3) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
		} else if (direction === "right" && this.position === 3) {
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position === 4) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position === 4) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		}
		return false;
	}
}

class Sblock extends Block {
	constructor(rowLength) {
		super(rowLength);
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[-1, 6],
		];
		this.token = "s";
		this.color = "box purple";
	}

	rotateShape() {
		let outofBoundslow = 0;
		let outofBoundshigh = 0;
		if (this.position % 2) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] + 1;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		} else if (this.position % 2 === 0) {
			this.shape[0][0] = this.shape[1][0] + 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] - 1;
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] - 1;
			if (this.shape[3][1] < 0) outofBoundslow++;
		}

		if (outofBoundshigh) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] -= outofBoundshigh;
			}
		} else if (outofBoundslow) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] += outofBoundslow;
			}
		}
	}
	checkBelow(board) {
		if (this.position % 2) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position % 2 === 0) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;

			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
		}
		return false;
	}

	checkSide(direction, board) {
		if (direction === "right" && this.position % 2 === 0) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;

			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left" && this.position % 2 === 0) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right") {
			if (board[this.shape[1][0]][this.shape[1][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] - 1]) return true;
		}
		return false;
	}
}

class Zblock extends Block {
	constructor(rowLength) {
		super(rowLength);
		this.shape = [
			[0, 6],
			[0, 5],
			[-1, 5],
			[-1, 4],
		];
		this.token = "z";
		this.color = "box yellow";
	}

	rotateShape() {
		let outofBoundslow = 0;
		let outofBoundshigh = 0;
		if (this.position % 2) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] + 1;
			if (this.shape[0][1] >= this.rowLength) outofBoundshigh++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] - 1;
			if (this.shape[3][1] < 0) outofBoundslow++;
		} else if (this.position % 2 === 0) {
			this.shape[0][0] = this.shape[1][0] + 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] + 1;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		}
		if (outofBoundshigh) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] -= outofBoundshigh;
			}
		} else if (outofBoundslow) {
			for (let i = 0; i < 4; i++) {
				this.shape[i][1] += outofBoundslow;
			}
		}
	}

	checkBelow(board) {
		if (this.position % 2) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;
			if (board[this.shape[1][0] + 1][this.shape[1][1]]) return true;
			if (board[this.shape[3][0] + 1][this.shape[3][1]]) return true;
		} else if (this.position % 2 === 0) {
			if (!board[this.shape[0][0] + 1]) return true;
			if (board[this.shape[0][0] + 1][this.shape[0][1]]) return true;

			if (board[this.shape[2][0] + 1][this.shape[2][1]]) return true;
		}

		return false;
	}

	checkSide(direction, board) {
		if (direction === "left" && this.position % 2 === 0) {
			if (board[this.shape[0][0]][this.shape[0][1] - 1]) return true;
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;

			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else if (direction === "right" && this.position % 2 === 0) {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] + 1]) return true;
		} else if (direction === "left") {
			if (board[this.shape[1][0]][this.shape[1][1] - 1]) return true;
			if (board[this.shape[3][0]][this.shape[3][1] - 1]) return true;
		} else {
			if (board[this.shape[0][0]][this.shape[0][1] + 1]) return true;
			if (board[this.shape[2][0]][this.shape[2][1] + 1]) return true;
		}
		return false;
	}
}

const shapes = [Jblock, Lblock, Squareblock, Lineblock, Tblock, Sblock, Zblock];
