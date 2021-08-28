class Lblock {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.shape = [
			[0, 5],
			[0, 6],
			[-1, 5],
			[-2, 5],
		];
		this.token = "l";
		this.position = 1;
	}

	rotateLeft() {
		this.position++;
		if (this.position === 5) this.position = 1;
		this.rotate();
		return this;
	}

	rotateRight() {
		this.position--;
		if (this.position === 0) this.position = 4;
		this.rotate();
		return this;
	}

	rotate() {
		let outofBoundslow = 0;
		let outofBoundshigh = 0;
		if (this.position === 1) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] + 1;
			if (this.shape[0][1] < 0) outofBoundshigh++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] - 2;
			this.shape[3][1] = this.shape[1][1];
		}
		if (this.position === 2) {
			this.shape[0][0] = this.shape[1][0] + 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			if (this.shape[2][1] >= this.rowLength) outofBoundshigh++;
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] + 2;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		}
		if (this.position === 3) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] + 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] + 2;
			this.shape[3][1] = this.shape[1][1];
		}
		if (this.position === 4) {
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
	}
}

class JBlock {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[-2, 5],
		];
		this.token = "j";
		this.position = 1;
	}

	rotateLeft() {
		this.position++;
		if (this.position === 5) this.position = 1;
		this.rotate();
		return this;
	}

	rotateRight() {
		this.position--;
		if (this.position === 0) this.position = 4;
		this.rotate();
		return this;
	}

	rotate() {
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
		}
		if (this.position === 2) {
			this.shape[0][0] = this.shape[1][0] - 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			if (this.shape[2][1] >= this.rowLength) outofBoundshigh++;
			this.shape[3][0] = this.shape[1][0];
			this.shape[3][1] = this.shape[1][1] + 2;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		}
		if (this.position === 3) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] + 1;
			if (this.shape[0][1] >= this.rowLength) outofBoundshigh++;
			this.shape[2][0] = this.shape[1][0] + 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] + 2;
			this.shape[3][1] = this.shape[1][1];
		}
		if (this.position === 4) {
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
}

class SquareBlock {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[-1, 4],
		];
		this.token = "=";
		this.position = 1;
	}

	rotateLeft() {
		this.position++;
		if (this.position === 5) this.position = 1;
		return this;
	}

	rotateRight() {
		this.position--;
		if (this.position === 0) this.position = 4;
		return this;
	}
}

class Lineblock {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.shape = [
			[0, 5],
			[-1, 5],
			[-2, 5],
			[-3, 5],
		];
		this.token = "|";
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
		// } else if (this.position === 3) {
		// 	for (let i = 1; i < 4; i++) {
		// 		let newColumn = this.shape[0][0] + i;
		// 		this.shape[i][1] = this.shape[0][1];
		// 		this.shape[i][0] = newColumn;
		// 		// if (this.rowLength <= newColumn) {
		// 		// 	outofBoundshigh++;
		// 		// }
		// 		// if (-1 >= newColumn) {
		// 		// 	outofBoundslow++;
		// 		// }
		// 	}
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
				// if (this.rowLength <= newColumn) {
				// 	outofBoundshigh++;
				// }
				// if (-1 >= newColumn) {
				// 	outofBoundslow++;
				// }
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
}

class Tblock {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[0, 6],
		];
		this.token = "t";
		this.position = 1;
	}

	rotateLeft() {
		this.position++;
		if (this.position === 5) this.position = 1;
		this.rotate();
		return this;
	}

	rotateRight() {
		this.position--;
		if (this.position === 0) this.position = 4;
		this.rotate();
		return this;
	}

	rotate() {
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
}

class Sblock {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.shape = [
			[0, 4],
			[0, 5],
			[-1, 5],
			[-1, 6],
		];
		this.token = "s";
		this.position = 1;
	}

	rotateLeft() {
		this.position++;
		if (this.position === 5) this.position = 1;
		this.rotate();
		return this;
	}
	rotateRight() {
		this.position--;
		if (this.position === 0) this.position = 4;
		this.rotate();
		return this;
	}

	rotate() {
		let outofBoundslow = 0;
		let outofBoundshigh = 0;
		if (this.position === 1) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] + 1;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		}
		if (this.position === 4) {
			this.shape[0][0] = this.shape[1][0] + 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] - 1;
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] - 1;
			if (this.shape[3][1] < 0) outofBoundslow++;
		}
		if (this.position === 3) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] + 1;
			this.shape[2][0] = this.shape[1][0] + 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] + 1;
			this.shape[3][1] = this.shape[1][1] - 1;
			if (this.shape[3][1] < 0) outofBoundslow++;
			if (this.shape[0][1] >= this.rowLength) outofBoundshigh++;
		}
		if (this.position === 2) {
			this.shape[0][0] = this.shape[1][0] - 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			this.shape[3][0] = this.shape[1][0] + 1;
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
}

class Zblock {
	constructor(rowLength) {
		this.rowLength = rowLength;
		this.shape = [
			[0, 6],
			[0, 5],
			[-1, 5],
			[-1, 4],
		];
		this.token = "z";
		this.position = 1;
	}

	rotateLeft() {
		this.position++;
		if (this.position === 5) this.position = 1;
		this.rotate();
		return this;
	}

	rotateRight() {
		this.position--;
		if (this.position === 0) this.position = 4;
		this.rotate();
		return this;
	}

	rotate() {
		let outofBoundslow = 0;
		let outofBoundshigh = 0;
		if (this.position === 1) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] + 1;
			if (this.shape[0][1] >= this.rowLength) outofBoundshigh++;
			this.shape[2][0] = this.shape[1][0] - 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] - 1;
			if (this.shape[3][1] < 0) outofBoundslow++;
		}
		if (this.position === 2) {
			this.shape[0][0] = this.shape[1][0] + 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] - 1;
			this.shape[3][0] = this.shape[1][0] - 1;
			this.shape[3][1] = this.shape[1][1] - 1;
			if (this.shape[3][1] < 0) outofBoundslow++;
		}
		if (this.position === 3) {
			this.shape[0][0] = this.shape[1][0];
			this.shape[0][1] = this.shape[1][1] - 1;
			if (this.shape[0][1] < 0) outofBoundslow++;
			this.shape[2][0] = this.shape[1][0] + 1;
			this.shape[2][1] = this.shape[1][1];
			this.shape[3][0] = this.shape[1][0] + 1;
			this.shape[3][1] = this.shape[1][1] + 1;
			if (this.shape[3][1] >= this.rowLength) outofBoundshigh++;
		}
		if (this.position === 4) {
			this.shape[0][0] = this.shape[1][0] - 1;
			this.shape[0][1] = this.shape[1][1];
			this.shape[2][0] = this.shape[1][0];
			this.shape[2][1] = this.shape[1][1] + 1;
			this.shape[3][0] = this.shape[1][0] + 1;
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
}

export default [Lineblock, Lblock, Sblock, Zblock, Tblock, SquareBlock, JBlock];
