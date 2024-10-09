const buttonClick = document.querySelector(".btn-check")
const inputBox = document.querySelector(".guess")
const showRanNum = document.querySelector(".number")
let scoreCounter = document.querySelector(".score")
let highscoreCounter = document.querySelector(".highscore")
const startGuessing = document.querySelector(".message")
const againButton = document.querySelector(".btn-again")
const celebration  = document.querySelector("h1")

//Random number
function newRandom(){
    return Math.floor(Math.random() * 20 + 1);
}
let randomNumber = newRandom()
console.log(randomNumber)

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
let startScore = 0
let highscore = Infinity;


buttonClick.addEventListener("click", function(){
    let userInput = Number(inputBox.value);

    if (typeof userInput === "string" || Number(userInput) > 20 || userInput == "") {
        errorSound.play()
        alert("ERROR! Not valid!")
        return; //Stops the function if invalid answer
    }

    if (userInput === randomNumber){
        correctSound.play()
        console.log("True");
        showRanNum.textContent = randomNumber
        startFireworks() // Starts the fireworks

        if (startScore < highscore){ //If score is less than highscore, show new highscore
            highscore = startScore
            newHighscoreSound.play()
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
    // highscoreCounter.textContent = 0;
    scoreCounter.textContent = 0;
    showRanNum.textContent = "?";
    inputBox.value = ""
    guesses.textContent = ""
    randomNumber = newRandom()
    console.clear()
    console.log(randomNumber)

    // More firework code
    stopFireworks();

    console.clear();
    console.log(randomNumber);
})


//Fireworks shamelessly stolen from ChatGPT :(

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId; // Store the animation frame ID

// Function to generate a random color
function getRandomColor() {
    const colors = [
        '#FF5733', // Red
        '#33FF57', // Green
        '#3357FF', // Blue
        '#FF33A1', // Pink
        '#FFB733', // Orange
        '#33FFF6', // Cyan
        '#A133FF', // Purple
        '#F4FF33'  // Yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Fireworks functions
function startFireworks() {
    const numParticles = 100; // Number of particles per explosion
    const explosionRadius = 100; // Increase this value to make the explosion larger

    function createFirework() {
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const speed = 2; // Speed of particles
        const lifetime = 100; // Number of frames for each particle

        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * 2 * Math.PI;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: lifetime,
                size: Math.random() * 4 + 2, // Increase particle size
                color: getRandomColor() // Assign a random color to each particle
            });
        }
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            // Draw particles
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color; // Use the particle's color
            ctx.fill();

            // Remove particle when life ends
            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            animationFrameId = requestAnimationFrame(drawFireworks); // Continue the animation
        }
    }

    createFirework(); // Trigger the explosion
    drawFireworks(); // Start rendering

    // Make the fireworks last longer by calling more explosions
    setTimeout(createFirework, 1000); // Trigger a second explosion after 1 second
}

function stopFireworks() {
    // Clear the canvas and cancel the animation frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = []; // Clear particles
    cancelAnimationFrame(animationFrameId); // Stop the animation
}

/* Add a feature you think could be fun! */