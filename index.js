const puzzles = [
    { question: "If I have {num1} apples and I give away {num2}, how many apples do I have left?", operation: "subtract" },
    { question: "I had {num1} candies and ate {num2}. How many candies do I have now?", operation: "subtract" },
    { question: "You have {num1} oranges and you buy {num2} more. How many oranges do you have in total?", operation: "add" },
    { question: "If a cake is cut into {num1} pieces and you eat {num2}, how many pieces are left?", operation: "subtract" },
    { question: "There are {num1} birds on a tree. If {num2} fly away, how many are left?", operation: "subtract" },
    { question: "You have {num1} balloons and {num2} burst. How many balloons are left?", operation: "subtract" },
    { question: "I have {num1} pencils and I give {num2} to my friends. How many do I have left?", operation: "subtract" },
    { question: "If I bake {num1} cookies and eat {num2}, how many are left?", operation: "subtract" },
    { question: "You bought {num1} toys and gave {num2} to your friends. How many do you have now?", operation: "subtract" },
    { question: "You had {num1} marbles and lost {num2}. How many marbles do you have left?", operation: "subtract" },
    { question: "If there are {num1} cars and {num2} drive away, how many cars are left?", operation: "subtract" },
    { question: "You have {num1} notebooks, and you buy {num2} more. How many notebooks do you have now?", operation: "add" },
    { question: "There are {num1} flowers in the garden, and you pick {num2}. How many are left?", operation: "subtract" },
    { question: "You had {num1} chocolates and gave {num2} to your friend. How many chocolates are left?", operation: "subtract" },
    { question: "You start with {num1} apples and eat {num2}. How many apples do you have now?", operation: "subtract" },
    { question: "There are {num1} cookies and you buy {num2} more. How many cookies do you have in total?", operation: "add" },
    { question: "You have {num1} toys and give {num2} away. How many toys do you have left?", operation: "subtract" },
    { question: "If there are {num1} candies and {num2} are eaten, how many are left?", operation: "subtract" },
    { question: "You have {num1} pencils and you give {num2} to your friends. How many pencils are left?", operation: "subtract" },
    { question: "There are {num1} ducks in a pond, and {num2} swim away. How many ducks are still in the pond?", operation: "subtract" },
    { question: "You have {num1} balloons, but {num2} burst. How many balloons are left?", operation: "subtract" },
    { question: "If you plant {num1} trees and then plant {num2} more, how many trees have you planted?", operation: "add" },
    { question: "You have {num1} coins and spend {num2} on candy. How many coins do you have left?", operation: "subtract" },
    { question: "You made {num1} sandwiches and ate {num2}. How many sandwiches are left?", operation: "subtract" },
    { question: "You have {num1} marbles and lose {num2}. How many marbles do you have now?", operation: "subtract" },
    { question: "There are {num1} people at a party, and {num2} leave. How many people are still at the party?", operation: "subtract" },
    { question: "You buy {num1} pizzas and then {num2} more. How many pizzas do you have now?", operation: "add" },
    { question: "You have {num1} chocolates, and you eat {num2}. How many chocolates are left?", operation: "subtract" },
    { question: "You collect {num1} stickers and give {num2} to your friends. How many stickers do you have left?", operation: "subtract" },
    { question: "There are {num1} students in a class, and {num2} leave early. How many students are still in class?", operation: "subtract" }
];

let currentQuestion = '';
let currentAnswer = 0;
let currentQuestionIndex = 0;
let score = 0;
let currentLevel = 1;
let roundsCompleted = 0;
let hearts = 3;
let heartRestoreTimeout;



window.onload = function () {
    initializeGame();
    displayQuestion();
}

function generateNumbers(level) {
    const maxNum = level * 10;
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * num1) + 1;
    return { num1, num2 };
}

function generateQuestion() {
    const puzzle = puzzles[currentQuestionIndex];
    const { num1, num2 } = generateNumbers(currentLevel);
    const question = puzzle.question.replace('{num1}', num1).replace('{num2}', num2);
    const answer = puzzle.operation === 'add' ? num1 + num2 : num1 - num2;
    return { question, answer };
}

function displayQuestion() {

    const generated = generateQuestion();
    currentQuestion = generated.question;
    currentAnswer = generated.answer;


    const questionElement = document.getElementById("question");
    questionElement.textContent = `${currentQuestion}`;
}

function checkAnswer() {
    event.preventDefault();
    const userAnswer = parseInt(document.getElementById("answer").value);
    const feedbackElement = document.getElementById("feedback");


    if (userAnswer === currentAnswer) {
        score += 5;
        updateScoreDisplay();
        feedbackElement.textContent = "Correct! Well done!";
        nextQuestion();



    } else {
        feedbackElement.textContent = "Oops! Try again.";
        failQuestion();

    }
    setTimeout(() => {
        feedbackElement.textContent = "";
    }, 500);

}






function failQuestion() {
    hearts--;
    console.log("Remaining hearts:", hearts);
    updateHearts();

    if (hearts === 0) {
        document.getElementById('message').textContent = "No more lives!";
        removeQuizArea();
        startHeartRestoreTimer();
    }
}

function updateHearts() {
    const heartContainer = document.getElementById('heart-container');
    heartContainer.textContent = '❤️'.repeat(hearts);
}
function removeQuizArea() {
    const quizArea = document.getElementById("quiz-area");
    if (quizArea) quizArea.style.display = "none";
}

function restoreQuizArea() {
    const quizArea = document.getElementById("quiz-area");
    if (quizArea) quizArea.style.display = "";
}

function startHeartRestoreTimer() {
    if (heartRestoreTimeout) {
        clearTimeout(heartRestoreTimeout);
    }

    heartRestoreTimeout = setTimeout(function () {
        restoreHeart();
    }, 3000);
}

function restoreHeart() {
    if (hearts === 0) {
        hearts++;
        updateHearts();
        document.getElementById('message').textContent = "One heart restored!";
    }
}

function initializeGame() {
    hearts = 3;
    updateHearts();
    document.getElementById('message').textContent = "";

    if (heartRestoreTimeout) {
        clearTimeout(heartRestoreTimeout);
    }


    currentQuestionIndex = 0;
    score = 0;
    currentLevel = 1;
    roundsCompleted = 0;
    updateScoreDisplay();
    displayQuestion();

}
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
    }
}



function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById("answer").value = '';
    if (currentQuestionIndex % 10 === 0) {
        currentLevel++;
        document.getElementById("feedback").textContent = `Great job! You've reached Level ${currentLevel}!`;
    }
    const levelDisplay = document.getElementById('level-display');
    if (levelDisplay) {
        levelDisplay.textContent = `${currentLevel}`;
    }

    if (currentQuestionIndex < puzzles.length) {
        displayQuestion();
    } else {
        roundsCompleted++;
        finishRound();
    }
}

function finishRound() {
    const quizArea = document.getElementById("quiz-area");
    if (roundsCompleted < 6) {
        quizArea.innerHTML = `
            <p>Round ${roundsCompleted} completed! You scored ${score} out of ${puzzles.length * roundsCompleted}!</p>
            <button onclick="startNextRound()">Start Next Round</button>
        `;
    } else {
        quizArea.innerHTML = `
            <p>Congratulations! You've completed all 6 rounds!</p>
            <p>Your final score: ${score} out of ${puzzles.length * 6}</p>
            <button onclick="resetGame()">Play Again</button>
        `;
    }
}

function startNextRound() {
    currentQuestionIndex = 0;
    displayQuestion();
    document.getElementById("quiz-area").innerHTML = `
        <p id="question"></p>
        <input type="number" id="answer">
        <button onclick="checkAnswer()">Submit</button>
        <p id="feedback"></p>
    `;
}

function initializeQuiz() {
    currentQuestionIndex = 0;
    hearts = 3;
    score = 0;
    currentLevel = 1;
    roundsCompleted = 0;
    updateScoreDisplay();
    displayQuestion();
    document.getElementById("quiz-area").innerHTML = `
        <p id="question"></p>
        <input type="number" id="answer">
        <button onclick="checkAnswer()">Submit</button>
        <p id="feedback"></p>
    `;
}

function resetGame() {
    initializeGame();
}

function isNumber(evt) {
    const charCode = evt.keyCode;
    if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
    }
}


