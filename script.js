const questions = [
    {
        question: "which is the largest the animal in the world ?",
        answers: [
            { text: "Shark", correct: "false" },
            { text: "Blue Whale", correct: "true" },
            { text: "Giraffe", correct: "false" },
            { text: "Elephant", correct: "false" },
        ]
    },
    {
        question: "Who is the first Prime Minister of India?",
        answers: [
            { text: "P. J. Abdul Kalam", correct: "false" },
            { text: "Indira Gandhi", correct: "false" },
            { text: "Narendrea Modi", correct: "false" },
            { text: "Jawaharlal nehru", correct: "true" },
        ]
    },
    {
        question: "How many wonders do we have in the world",
        answers: [
            { text: "Eight", correct: "false" },
            { text: "Six", correct: "false" },
            { text: "Seven", correct: "true" },
            { text: "Nine", correct: "false" },
        ]
    },
    {
        question: "Which planet is known as “The Blue Planet”?",
        answers: [
            { text: "Earth", correct: "true" },
            { text: "Mercury", correct: "false" },
            { text: "venus", correct: "false" },
            { text: "Neptune", correct: "false" },
        ]
    },
    {
        question: "What is the driver of a Train called?",
        answers: [
            { text: "Pilot", correct: "false" },
            { text: "Train Pilot", correct: "false" },
            { text: "Captin", correct: "false" },
            { text: "Loco pilot", correct: "true" },
        ]
    },
    {
        question: "How many states are there in India?",
        answers: [
            { text: "27", correct: "false" },
            { text: "29", correct: "true" },
            { text: "32", correct: "false" },
            { text: "30", correct: "false" },
        ]
    },
    {
        question: "Which bird is the universal symbol of Peace?",
        answers: [
            { text: "Pigeon", correct: "false" },
            { text: "Dove", correct: "true" },
            { text: "Peacock", correct: "false" },
            { text: "Pelican", correct: "false" },
        ]
    },
    {
        question: " How many Union Territories are there in India?",
        answers: [
            { text: "7", correct: "false" },
            { text: "11", correct: "false" },
            { text: "10", correct: "false" },
            { text: "8", correct: "true" },
        ]
    },
    {
        question: "what is the meaning of ‘Hakuna Matata’?",
        answers: [
            { text: "Thank you", correct: "false" },
            { text: "Good Night", correct: "false" },
            { text: "No Worries", correct: "true" },
            { text: "Good Night", correct: "false" },
        ]
    },
    {
        question: "Which fruit is associated with Isaac Newton?",
        answers: [
            { text: "Pear", correct: "false" },
            { text: "Pineapple", correct: "false" },
            { text: "Banana", correct: "false" },
            { text: "Apple", correct: "true" },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;   //initialize index number = 0 
    score = 0;                  //initialize score = 0 
    nextButton.innerHTML = "Next";      //these next btn will be work as a home button 
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];  // these will be add the number the current question 1
    let questionNo = currentQuestionIndex + 1;              // these will be the next number to the question 2
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   // 1. current question will be shown

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");   //it will create a new button 
        button.innerHTML = answer.text;                     // it will add the text to the button
        button.classList.add("btn");                        // define a class 'btn'
        answerButtons.appendChild(button);                  // it will append into the button

        if (answer.correct) {
            button.dataset.correct = answer.correct;        // if the answer is correct it will check the given dataset  
        }
        button.addEventListener("click", selectAnswer);     // this is the event lisenter for the check the answer
    });
}

function resetState() {                                      // this function will reset the answer score and start from the begin
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {                        // this condition will remove the selected answer from the previous question
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {                                   // this function is for the selected answer will be highlighted
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {      // this function is write for if the user click the wrong button this will show the correct one
        if (button.dataset.correct === "true") {                  // this one check the condition the correct answer
            button.classList.add("correct");
        }
        button.disabled = true;                                // this is for we cannot choose the answer after the correct answer shown 
    });
    nextButton.style.display = "block";
}

function showScore() {                                         // this function will show the score 
    resetState();                                             // it will clear all the answers 
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart the quiz";
    nextButton.style.display = "block";
}

function handleNextButton() {                                  // this is the function for next button 
    currentQuestionIndex++;                                   // it will increase the score 
    if (currentQuestionIndex < questions.length) {              // check the condition
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();