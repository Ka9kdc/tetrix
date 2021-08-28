// import React from "react";
// import ReactDOM from "react-dom";

// function App (props){
//     return
// }

import shapes from "./shapes";

const appDiv = document.getElementById("app");
const gameState = {
	currentBlock: {},
};

function buildRow() {
	const rowDiv = document.createElement("tr");
	const row = [];
	for (let j = 0; j < 10; j++) {
		row.push("");
		const cell = document.createElement("td");
		rowDiv.append(cell);
	}
	return [rowDiv, row];
}

function buildBoard() {
	gameState.board = [];
	const table = document.createElement("table");
	for (let i = 0; i < 20; i++) {
		const [rowDiv, row] = buildRow();
		gameState.board.push(row);
		table.append(rowDiv);
	}
	appDiv.append(table);
}

function addBlock() {
	const chosenBlock = shapes[Math.floor(Math.random() * shapes.length)];
	gameState.currentBlock = new chosenBlock(gameState.board[0].length);
	// gameState.currentBlock.token = chosenBlock.token
}

function moveBlock() {
	let tileStuck = false;
	for (let j = 0; j < 4; j++) {
		removeRender(gameState.currentBlock.shape[j]);
	}
	for (let i = 0; i < 4; i++) {
		gameState.currentBlock.shape[i][0]++;
		addRender(gameState.currentBlock.shape[i]);
		if (
			gameState.board[gameState.currentBlock.shape[i][0] + 1] === undefined &&
			gameState.currentBlock.shape[i][0] + 1 > 0
		) {
			tileStuck = true;
		} else if (
			gameState.board[gameState.currentBlock.shape[i][0] + 1] &&
			!tileStuck
		) {
			// console.log(gameState.board[gameState.currentBlock.shape[i][0]+1][gameState.currentBlock.shape[i][1]])
			if (
				gameState.board[gameState.currentBlock.shape[i][0] + 1][
					gameState.currentBlock.shape[i][1]
				]
			) {
				tileStuck = true;
				for (let j = i - 1; j > -1; j--) {
					if (
						gameState.currentBlock.shape[i][0] + 1 ===
						gameState.currentBlock.shape[j][0]
					) {
						tileStuck = false;
						break;
					}
				}
			}
		}
	}
	if (tileStuck) {
		gameOver();
		// clearInterval(gameState.intervalId)
		// console.log(gameState.currentBlock.shape)
	}
}

function tick() {
	clearRow();
	moveBlock();
}

function startGame() {
	buildBoard();
	addBlock();
	gameState.score = 0;
	gameState.intervalId = setInterval(tick, 1000 / 5);
}

startGame();

function removeRender(shape) {
	// console.log(shape)
	if (shape[0] < 0 || shape[1] < 0) return;
	const row = document.getElementsByTagName("tr")[shape[0]];
	const cell = row.getElementsByTagName("td")[shape[1]];
	cell.innerText = "";
	gameState.board[shape[0]][shape[1]] = "";
}

function addRender(shape) {
	if (shape[0] < 0 || shape[1] < 0) return;
	const row = document.getElementsByTagName("tr")[shape[0]];
	const cell = row.getElementsByTagName("td")[shape[1]];
	cell.innerText = gameState.currentBlock.token;
	gameState.board[shape[0]][shape[1]] = gameState.currentBlock.token;
}

function moveWithArrow(directions) {
	let tileStuck = false;
	for (let j = 0; j < 4; j++) {
		removeRender(gameState.currentBlock.shape[j]);
	}
	let hitwall = false;
	if (directions === "left") {
		for (let i = 0; i < 4; i++) {
			if (gameState.currentBlock.shape[i][1] === 0 || hitwall) {
				if (!hitwall) {
					hitwall = true;
					let pointer = i - 1;
					while (pointer > -1) {
						gameState.currentBlock.shape[pointer][1]++;
						pointer--;
					}
				}
			} else {
				gameState.currentBlock.shape[i][1]--;
			}

			// if(gameState.board[gameState.currentBlock.shape[i][0]+1]=== undefined &&gameState.currentBlock.shape[i][0]+1 > 0 ){
			//     // console.log("failed")
			//    tileStuck = true
			// }
			// else if(gameState.board[gameState.currentBlock.shape[i][0]+1] && gameState.board[gameState.currentBlock.shape[i][0]+1][gameState.currentBlock.shape[i][1]]) {
			//     tileStuck = true
			//     // console.log("failed 2")
			// }
		}
	} else if (directions === "right") {
		for (let i = 0; i < 4; i++) {
			if (
				gameState.currentBlock.shape[i][1] === gameState.board[0].length - 1 ||
				hitwall
			) {
				if (!hitwall) {
					hitwall = true;
					let pointer = i - 1;
					while (pointer > -1) {
						gameState.currentBlock.shape[pointer][1]--;
						pointer--;
					}
				}
			} else {
				gameState.currentBlock.shape[i][1]++;
			}
			// if(gameState.board[gameState.currentBlock.shape[i][0]+1]=== undefined &&gameState.currentBlock.shape[i][0]+1 > 0 ){
			//     // console.log("failed")
			//    tileStuck = true
			// }
			// else if(gameState.board[gameState.currentBlock.shape[i][0]+1] && gameState.board[gameState.currentBlock.shape[i][0]+1][gameState.currentBlock.shape[i][1]]) {
			//     tileStuck = true
			//     // console.log("failed 2")
			// }
		}
	} else if (directions === "up") {
		for (let i = 0; i < 4; i++) {
			gameState.currentBlock.shape[i][0]--;
		}
	}

	for (let i = 0; i < 4; i++) {
		addRender(gameState.currentBlock.shape[i]);
	}
}

// function pauseMovement(){

// }

document.addEventListener("keydown", function (event) {
	event.preventDefault();
	// console.log("hello", event.key)
	const key = event.key;
	switch (key) {
		case "ArrowLeft":
			return moveWithArrow("left");
		case "ArrowRight":
			return moveWithArrow("right");
		case "ArrowUp":
			return moveWithArrow("up");
		case "ArrowDown":
			return moveBlock();
		case "a":
			return rotate("left");

		case "s":
			return rotate("right");
		default:
			break;
	}
});

function clearRow() {
	const rowsToClear = [];
	for (let i = 0; i < gameState.board.length; i++) {
		if (gameState.board[i][0]) {
			let pointer = 0;
			while (
				pointer < gameState.board[0].length &&
				gameState.board[i][pointer]
			) {
				pointer++;
			}
			if (pointer === gameState.board[0].length) rowsToClear.push(i);
		}
	}
	const table = document.getElementsByTagName("table")[0];
	for (let j = rowsToClear.length - 1; j >= 0; j--) {
		const row = table.getElementsByTagName("tr")[rowsToClear[j]];
		table.removeChild(row);
		gameState.board.splice(rowsToClear[j], 1);
		gameState.score++;
	}
	for (let j = 0; j < rowsToClear.length; j++) {
		const [rowDiv, row] = buildRow();
		gameState.board.unshift(row);
		table.prepend(rowDiv);
	}
}

function gameOver() {
	let over = false;

	for (let i = 0; i < gameState.board[0].length; i++) {
		if (gameState.board[0][i] !== "") over = true;
	}
	if (over) {
		clearInterval(gameState.intervalId);
	} else {
		addBlock();
	}
}

// function test(){
//     buildBoard()
//     addBlock()
// moveBlock()
// moveBlock()

// }

// test()

function rotate(directions) {
	for (let j = 0; j < 4; j++) {
		removeRender(gameState.currentBlock.shape[j]);
	}
	if (directions === "left") {
		gameState.currentBlock.rotateLeft();
	} else {
		gameState.currentBlock.rotateRight();
	}
	for (let j = 0; j < 4; j++) {
		addRender(gameState.currentBlock.shape[j]);
	}
}
