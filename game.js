var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = ture;
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("wrong");
        function playSound(){
            var audio = new Audio("sounds/" + wrong + ".mp3");
            audio.play();
        }
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver ();
    }
}


$(".btn").click(function handler(event){
    var userChosenColour = $(event.target).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*3) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern=[];
    started=false;
}