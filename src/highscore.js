const list = document.getElementsByTagName("ol")[0]
let scores = []

function renderHighScores(){
	for(let i =0; i < scores.length; i++){
		const item = document.createElement("li")
		item.innerText = `${scores[i].name}: ${scores[i].score}`
		list.append(item)
	}
}

window.addEventListener('load', () =>{
    if(localStorage.getItem("highscores")){
		scores = JSON.parse(localStorage.getItem("highscores"))
	} else {
		scores = [
			{name: "Highscore",
		score: 5000},
		{name: "Highscore",
		score: 4000},
		{name: "Highscore",
		score: 3000},
		{name: "Highscore",
		score: 2000},
		{name: "Highscore",
		score: 1000}
		]
	}
	renderHighScores()
})

