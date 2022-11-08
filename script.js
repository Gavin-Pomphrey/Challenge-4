var quizBody = document.getElementById("Javaquiz");
var resultsEl = document.getElementById("checkresults");
var finalScoreEl = document.getElementById("score");
var gameoverDiv = document.getElementById("finished");
var questionsEl = document.getElementById("quiz-questions");
var quizTimer = document.getElementById("remaining time");
var startQuizButton = document.getElementById("startbutton");
var startQuizDiv = document.getElementById("homepage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("scorepage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("HSinitials");
var endGameBtns = document.getElementById("finishedbutton");
var submitScoreBtn = document.getElementById("checkScore");
var highscoreDisplayScore = document.getElementById("HSscore");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


var quiz-questions = [{
    question: "Commonly used data types do not include?",
    answerA: "Strings",
    answerB: "Booleans",
    answerC: "Alerts",
    answerD: "Numbers",
    correctAnswer: "b"},
  {
    question: "The condition in an If/Else statement is enclosed with _____?",
    answerA: "Quotes",
    answerB: "Curly Brackets",
    answerC: "Parenthesis",
    answerD: "Square Brackets",
    correctAnswer: "a"},
   {
    question: "Arrays in JavaScript can be used to store ______?",
    answerA: "Numbers and Strings",
    answerB: "Other Arrays",
    answerC: "Booleans",
    answerD: "All the Above",
    correctAnswer: "d"},
    {
    question: "String values must be enclosed within _____ when being assigned to variables?",
    answerA: "Commas",
    answerB: "Curly Brackets",
    answerC: "Quotes",
    answerD: "Parenthesis",
    correctAnswer: "b"},
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is?",
    answerA: "JavaScript",
    answerB: "Terminal/Bash",
    answerC: "For Loops",
    answerD: "Console.log",
    correctAnswer: "d"},  
  ];

var finalQuestionIndex = quiz-questions.length;
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quiz-questions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.answerA;
    buttonB.innerHTML = currentQuestion.answerB;
    buttonC.innerHTML = currentQuestion.answerC;
    buttonD.innerHTML = currentQuestion.answerD;
};


function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

  
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You scored " + score + " out of " + quizQuestions.length;
}

submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});


function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}


function checkScore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}


function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}


function playAgain(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
}


function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else{
        showScore();
    }
}


startQuizButton.addEventListener("click",startQuiz);
