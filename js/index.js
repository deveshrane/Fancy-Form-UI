// Questions Array
const questions = [
    { question: 'Enter your First Name' },
    { question: 'Enter your Last Name' },
    { question: 'Enter your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create a Password', type: 'password' }
];

// Transition Times 
const shakeTime = 100; //Shake transition time
const switchTime = 200; //Transition between questions

// Init position At first question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

// EVENTS

document.addEventListener('DOMContentLoaded', getQuestion);
nextBtn.addEventListener('click', validate);
inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        validate();
    }
})

// FUNCTIONS

// Get Question From Array & Add To Markup
function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;
    // Get Current Type
    inputField.type = questions[position].type || 'text';
    // Get Current Answer
    inputField.value = questions[position].answer || '';
    // Focus on Element
    inputField.focus();

    //Set Progress Bar Width
    progress.style.width = (position * 100) / questions.length + '%';

    // Add user icon or back arrow
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}
// Display Question to user
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}
// Hide Question
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}
// Transform to create shake motion
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`
}
// Validate field
function validate() {
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}
// Field Input Failed 
function inputFail() {
    formBox.className = 'error';
    // Repeat shake motion
    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0)
        inputField.focus();
    }
}
// Field Input Passed 
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);
    // Store Answer in array
    questions[position].answer = inputField.value;
    //Increment position
    position++;

    // If New Question, hide Current and Get Next
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove if No More Questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        // Form Complete
        formComplete();
    }
}
// All Fields Complete - Show h1 end
function formComplete() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}. You are registered and will get an email shortly.`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}