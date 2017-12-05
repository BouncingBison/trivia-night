$(document).ready(function() {
    // $("#banner").append("div")

    triviaTime();
})

//Global Variables---------------------------------------

var currentQuestion;
var numCorrect;
var numWrong;
// var questionCounter = 0;

//Some things the user will read after each question.
var message = {
    correct: "That is correct!",
    incorrect: "That is incorrect!",
    time: "TIME"
};

//question & answer array-------------------------------------------
var questions = [{
        // 0
        asking: "what is the most diverse podcast in the world?",
        answer: ["A. failing upwards", "B. cereal", "C. 'bill simmons podcast'"],
        correct: 0
    },
    {
        // 1
        asking: "where was brad pitt born?",
        ans: ["A. california like all the other beautiful people", "B. shockingly, its southern missouri", "C. divinity is not born, it is"],
        correct: 2
    },
    {
        // 2
        asking: "What is the true classification of 'boneless' wings?",
        ans: ["A. boneless wings, duh", "B. chunks of white-meat chicken breast", "C. this isnt even a discussion, they're adult chicken nuggets."],
        correct: 2
    },
    {
        // 3
        asking: "What do you sit on but you cant take it with you?",
        ans: ["A. uhhhh ", "B. still uhhhhh ", "C. chair!", "D. i know this reference"],
        correct: 3
    }
];



//New game conditions function--------------------------------
function triviaTime() {
    // emptying out columns containing elements of the test.
    $("#questionCol").empty()
    $("#messageCol").empty()
    $("#answerCol").empty()
        // taking variables down to zero.
        // currentQuestion = 0
        //     // numCorrect = 0;
        // correctAnswers = 0
        //     // numWrong = 0;
        // incorrectAnswers = 0
        // introducing a question. 
    insertQuestion();
}


//add question & answers to page-----------------------------------------
var answerChoice;

function insertQuestion() {
    $("#answerCol").empty();
    // pulling an item from questions array by index and presenting 
    // the asking(the question) property
    $("#questionCol").html(questions[currentQuestion].asking);
    // incrementing the loop to 3 since we have only 4 questions
    for (i = 0; i < 3; i++) {
        var answerChoice = $("<div>")
        answerChoice.text(questions[currentQuestion].ans[i])
        answerChoice.addClass("decision");
        $('.decision#' + target).css('z-index', '0'); //sets z-index for current target to 1
        $("#answerCol").append(answerChoice);
    }





    timerStart()
        //Set Onclick for answer divs------------------------------------------
    $('.selection').on('click', function() {
        answerChoice = $(this).data('');
        clearInterval(timer);
        answer();
    });
}

var seconds
var timeOut = true;

function timerStart() {
    seconds = 15
    timer = setInterval(decrement, 10000);
}

//setting for timer decrease
function decrement() {
    $("#timerBanner").html("Time remaining: " + seconds)
    seconds--
    if (seconds < 0) {
        $("#messageCol").html(message.time);
        clearInterval(timer);
        timeOut = false
        answer();
    }
}


//answer display
function answer() {
    $('.yourChoice').empty();
    $("#questionCol").empty();
    var ansIndex = questions[currentQuestion].correct
    var ansText = questions[currentQuestion].ans[questions[currentQuestion].ans];

    if ((answerChoice == ansIndex) && (timeOut == true)) {
        $("#answerArea").html(message.correct)
        numCorrect++
    } else if ((answerChoice != ansIndex) && (timeOut == true)) {
        $("#answerArea").html(message.incorrect)
        numWrong++
    } else {
        $("#answerArea").html(message.incorrect)
        numWrong++
        timeOut = false
    }
    currentQuestion++
    questionCounter++
    questionTally()
};

//end game conditions ----- keept track of current question
function questionTally() {

    if (questionCounter === questions.length) {
        $("#messageCol").html("There is no win or lose, just continued existence in Florthop'g.")
        $("#questionCol").html("You got " + numCorrect + " not so wrong...");
        $("#answerArea").html("You got " + numWrong + " very incorrect.")
    } else {
        $("#messageCol").empty();
        setTimeout(addQuestion, 4000);
    }

}