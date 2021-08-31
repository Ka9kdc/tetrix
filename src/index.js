const appDiv = document.getElementById("app");
const scoreSpan = document.getElementById("score");
const levelSpan = document.getElementById("level");
const lineSpan = document.getElementById("line");
const startButton = document.getElementById("start");
const overLayDiv = document.getElementById("overlay");
const messageDiv = document.getElementById("Message");
const homeDiv = document.getElementById("home");

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
	table.className = "border";
	for (let i = 0; i < 20; i++) {
		const [rowDiv, row] = buildRow();
		gameState.board.push(row);
		table.append(rowDiv);
	}
	appDiv.append(table);
}

buildBoard();
function addBlock() {
	const chosenBlock = shapes[Math.floor(Math.random() * shapes.length)];
	gameState.currentBlock = new chosenBlock(gameState.board[0].length);
}

function moveBlock() {
	for (let j = 0; j < 4; j++) {
		removeRender(gameState.currentBlock.shape[j]);
	}

	for (let i = 0; i < 4; i++) {
		gameState.currentBlock.shape[i][0]++;
		addRender(gameState.currentBlock.shape[i]);
	}
}

function tick() {
	if (gameState.currentBlock.checkBelow(gameState.board)) {
		clearRow();
		gameOver();
	} else moveBlock();
}

function startGame() {
	addBlock();
	gameState.score = 0;
	gameState.level = 1;
	gameState.lines = 0;
	gameState.intervalId = setInterval(tick, 1000 / gameState.level);
}

function removeRender(shape) {
	// console.log(shape)
	if (shape[0] < 0 || shape[1] < 0) return;
	const row = document.getElementsByTagName("tr")[shape[0]];
	const cell = row.getElementsByTagName("td")[shape[1]];
	cell.className = "";
	gameState.board[shape[0]][shape[1]] = "";
}

function addRender(shape) {
	if (shape[0] < 0 || shape[1] < 0) return;
	const row = document.getElementsByTagName("tr")[shape[0]];
	const cell = row.getElementsByTagName("td")[shape[1]];
	cell.className = gameState.currentBlock.color;
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
		// clearInterval(gameState.intervalId)
		// setTimeout(() => gameState.intervalId = setInterval(tick, 1000/gameState.level), 1000/gameState.level )
	}

	for (let i = 0; i < 4; i++) {
		addRender(gameState.currentBlock.shape[i]);
	}
}

document.addEventListener("keydown", function (event) {
	event.preventDefault();

	const key = event.key;
	switch (key) {
		case "ArrowLeft":
			return moveWithArrow("left");
		case "ArrowRight":
			return moveWithArrow("right");
		case "ArrowUp":
			return moveWithArrow("up");
		case "ArrowDown":
			gameState.score++;
			scoreSpan.innerText = gameState.score;
			return tick();
		case "a":
		case "A":
			return rotate("left");

		case "s":
		case "S":
			return rotate("right");
		default:
			break;
	}
});

startButton.addEventListener("click", () => {
	if (overLayDiv.className === "overlay") {
		overLayDiv.className = "";
		homeDiv.className = "hidden";
	}
	if (startButton.innerText !== "Start") {
		clearboard();
	} else {
		startButton.innerText = "Restart";
		startGame();
	}
});

homeDiv.addEventListener("click", () => {
	window.location = "https://ka9kdc.github.io/tetrix/";
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
		gameState.score += 100;
		gameState.lines++;
	}
	for (let j = 0; j < rowsToClear.length; j++) {
		const [rowDiv, row] = buildRow();
		gameState.board.unshift(row);
		table.prepend(rowDiv);
	}
	scoreSpan.innerText = gameState.score;
	lineSpan.innerText = gameState.lines;
	if (gameState.lines >= gameState.level * 5) {
		gameState.level++;
		levelSpan.innerText = gameState.level;
		clearInterval(gameState.intervalId);
		gameState.intervalId = setInterval(
			tick,
			1000 / Math.ceil(gameState.level / 5)
		);
	}
}

function gameOver() {
	let over = false;

	for (let i = 0; i < gameState.board[0].length; i++) {
		if (gameState.board[0][i] !== "") over = true;
	}
	if (over) {
		clearInterval(gameState.intervalId);
		let newHighscore = false;
		for (let i = 0; i < scores.length; i++) {
			if (gameState.score > scores[i].score) {
				newHighscore = true;
			}
		}
		if (newHighscore) {
			homeDiv.className = "";
			messageDiv.innerText = `Game Over! New High Score was achieved`;
			messageDiv.style.fontSize = "2em";
			console.log(overLayDiv.getElementsByTagName("input").length)
			if (!overLayDiv.getElementsByTagName("input").length) {
				const inputField = document.createElement("input");
				inputField.type = "text";
				inputField.name = "name";
				inputField.placeholder = "name";
				inputField.className = "input"
				inputField.addEventListener("change", (event) => {
					console.log(event.target.value);
					gameState.name = event.target.value;
				});
				const submitButton = document.createElement("button");
				submitButton.className = "input"
				submitButton.innerText = "submit";
				submitButton.addEventListener("click", () => {
					updateHighScores();
					overLayDiv.removeChild(submitButton);
					overLayDiv.removeChild(inputField);
				});
				overLayDiv.append(inputField);
				overLayDiv.append(submitButton);
			}
			
		} else {
			messageDiv.innerText = "Game Over!";
		}
		overLayDiv.className = "overlay";
		startButton.innerText = "New Game";
	} else {
		addBlock();
	}
}

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

function clearboard() {
	for (let i = 0; i < gameState.board.length; i++) {
		for (let j = 0; j < gameState.board[0].length; j++) {
			if (gameState.board[i][j]) removeRender([i, j]);
		}
	}
	addBlock();
	gameState.score = 100;
	gameState.level = 1;
	gameState.lines = 0;
	gameState.intervalId = setInterval(tick, 1000 / gameState.level);
	scoreSpan.innerText = gameState.score;
	levelSpan.innerText = gameState.level;
	lineSpan.innerText = gameState.lines;
	messageDiv.innerText = "";
}

document.getElementById("controls").addEventListener("click", () => {
	if (gameState.intervalId) {
		clearInterval(gameState.intervalId);
	}
	document.getElementById("directions").classList.remove("hidden");
});
document.getElementById("close").addEventListener("click", () => {
	if (gameState.intervalId) {
		gameState.intervalId = setInterval(
			tick,
			1000 / Math.ceil(gameState.level / 5)
		);
	}
	document.getElementById("directions").classList.add("hidden");
});

function updateHighScores() {
	for (let i = 0; i < scores.length; i++) {
		if (gameState.score > scores[i].score) {
			const entry = {
				name: gameState.name,
				score: gameState.score,
			};
			scores.splice(i, 0, entry);
			scores.pop();
			break;
		}
	}
	localStorage.setItem("highscores", JSON.stringify(scores));
	while (list.lastChild) list.removeChild(list.lastChild);
	renderHighScores();
}
