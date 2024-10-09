const buttonClick = document.querySelector(".btn-check")
const inputBox = document.querySelector(".guess")
const showRanNum = document.querySelector(".number")
let scoreCounter = document.querySelector(".score")
let highscoreCounter = document.querySelector(".highscore")
const startGuessing = document.querySelector(".message")
const againButton = document.querySelector(".btn-again")

//Guesses so far
startGuessing.insertAdjacentHTML('beforeend', `<p class = "labelGuesses">Guesses:</p>`)
const labelGuesses = document.querySelector(".labelGuesses")
labelGuesses.insertAdjacentHTML("beforeend", '<span class = "guesses"></span>')
let guesses = document.querySelector(".guesses")

//Audio
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const errorSound = new Audio ('error.mp3');
const newHighscoreSound = new Audio ('highscore.mp3');

//Check button
let ranNumber  = Math.floor(Math.random() * 21);
console.log(ranNumber)
let startScore = 0
let highscore = Infinity;

buttonClick.addEventListener("click", function(){
    let userInput = Number(inputBox.value);

    if (typeof userInput === "string" || Number(userInput) > 20 || userInput == "") {
        errorSound.play()
        alert("ERROR! Not valid!")
        return; //Stops the function if invalid answer
    }

    if (userInput === ranNumber){
        correctSound.play()
        console.log("True")
        showRanNum.textContent = ranNumber
        if (startScore < highscore){ //If score is less than highscore, show new highscore
            highscore = startScore
            highscoreCounter.textContent = startScore
        }
        }else {
        console.log("false")
        wrongSound.play()
        inputBox.value = ""
        startScore++
        scoreCounter.textContent = startScore
        guesses.insertAdjacentText("beforeend", `${userInput},`);  // Adds the current guess
         }
})

//Again button
againButton.addEventListener("click", function(){
    highscore = Infinity, startScore = 0;
    highscoreCounter.textContent = 0;
    scoreCounter.textContent = 0;
    showRanNum.textContent = "?";
    inputBox.value = ""
    guesses.textContent = ""
})




/*

- Optional - Add confetti when the correct number is guessed

- Optional - Play diferent sounds when the correct or wrong number is guessed

Add a feature you think could be fun! */