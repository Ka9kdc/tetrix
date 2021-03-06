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
	for (let i = 0; i < 22; i++) {
		const [rowDiv, row] = buildRow();
		gameState.board.push(row);
		if (i < 3) rowDiv.className = "hidden";
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
	// if (shape[0] < 3) return;
	const row = document.getElementsByTagName("tr")[shape[0]];
	const cell = row.getElementsByTagName("td")[shape[1]];
	cell.className = "";
	gameState.board[shape[0]][shape[1]] = "";
}

function addRender(shape) {
	// if (shape[0] < 3) return;
	const row = document.getElementsByTagName("tr")[shape[0]];
	const cell = row.getElementsByTagName("td")[shape[1]];
	cell.className = gameState.currentBlock.color;
	gameState.board[shape[0]][shape[1]] = gameState.currentBlock.token;
}

function rotate(directions) {
	if (
		!gameState.currentBlock.checkForClearRotation(
			gameState.currentBlock.position + 1,
			gameState.board
		)
	)
		return;
	for (let j = 0; j < 4; j++) {
		removeRender(gameState.currentBlock.shape[j]);
	}
	if (directions === "left") {
		gameState.currentBlock.rotateLeft(gameState.board);
	} else {
		gameState.currentBlock.rotateRight(gameState.board);
	}
	for (let j = 0; j < 4; j++) {
		addRender(gameState.currentBlock.shape[j]);
	}
}

function moveWithArrow(directions) {
	for (let j = 0; j < 4; j++) {
		removeRender(gameState.currentBlock.shape[j]);
	}
	if (directions === "left") {
		for (let i = 0; i < 4; i++) {
			if (gameState.currentBlock.shape[i][1] === 0) {
				let pointer = i - 1;
				while (pointer > -1) {
					gameState.currentBlock.shape[pointer][1]++;
					pointer--;
				}
				break;
			} else {
				gameState.currentBlock.shape[i][1]--;
			}
		}
	} else if (directions === "right") {
		for (let i = 0; i < 4; i++) {
			if (
				gameState.currentBlock.shape[i][1] ===
				gameState.board[0].length - 1
			) {
				let pointer = i - 1;
				while (pointer > -1) {
					gameState.currentBlock.shape[pointer][1]--;
					pointer--;
				}
				break;
			} else {
				gameState.currentBlock.shape[i][1]++;
			}
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
		if (gameState.board[3][i] !== "") over = true;
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
			if (!overLayDiv.getElementsByTagName("input").length) {
				const inputField = document.createElement("input");
				inputField.type = "text";
				inputField.name = "name";
				inputField.placeholder = "name";
				inputField.className = "input";
				inputField.addEventListener("change", (event) => {
					gameState.name = event.target.value;
				});
				const submitButton = document.createElement("button");
				submitButton.className = "input";
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

function clearboard() {
	for (let i = 0; i < gameState.board.length; i++) {
		for (let j = 0; j < gameState.board[0].length; j++) {
			if (gameState.board[i][j]) removeRender([i, j]);
		}
	}
	addBlock();
	gameState.score = 0;
	gameState.level = 1;
	gameState.lines = 0;
	gameState.intervalId = setInterval(tick, 1000 / gameState.level);
	scoreSpan.innerText = gameState.score;
	levelSpan.innerText = gameState.level;
	lineSpan.innerText = gameState.lines;
	messageDiv.innerText = "";
}

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

document.addEventListener("keydown", function (event) {
	event.preventDefault();

	const key = event.key;
	switch (key) {
		case "ArrowLeft":
			if (!gameState.currentBlock.checkSide("left", gameState.board)) {
				return moveWithArrow("left");
			}
			break;
		case "ArrowRight":
			if (!gameState.currentBlock.checkSide("right", gameState.board)) {
				return moveWithArrow("right");
			}
			break;
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
	window.scrollTo(0, document.body.scrollHeight);
});

homeDiv.addEventListener("click", () => {
	window.location = "https://ka9kdc.github.io/tetrix/";
});

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
