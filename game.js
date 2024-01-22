
var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0; 


function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    indexOfLastAnswer = 0;
    buttonPressed = 0;
}

function nextSequence() {
    var randomNumber = 4 * Math.random();
    randomNumber = Math.floor(randomNumber);
    var nextColor = buttonColours[randomNumber];
    $("#level-title").text("Level " + level);
    return nextColor;
}

function playSound(color) { 
    var chosenMusic = new Audio("/sounds/" + color+ ".mp3");
    chosenMusic.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function handleKeyPress() {
    randomChosenColour = nextSequence();
    var chosenColourId = "#" + randomChosenColour;
    $(chosenColourId).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);  
}

var i = 0;
function checkAnswer(currentLevel){
  //  for (i=0; i <= currentLevel; i++){
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if(currentLevel === level) {
                console.log("Succsess!")
                setTimeout(function(){
                    level++;
                    handleKeyPress();
                    userClickedPattern = [];
                    
                },1000)
            }
            else {
                console.log("Click some more buttons for daddy.");
            }
        }
        else{
            var losted = new Audio("/sounds/wrong.mp3");
            losted.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            console.log(gamePattern);
            console.log(userClickedPattern);
            $("h1").text("Game over, Press Any Key to Restart.");
            startOver();

        }
    }
//}

var randomChosenColour;
var started = false;

$(document).keydown(function() {
    if(started === false) {
        handleKeyPress();
        started = true;
    }
    else {
        console.log("The games is already started. Just play with your mouse b.")
    }
});

var buttonPressed = 0;
var indexOfLastAnswer = 0;
var userChosenColour;

$(".btn").click(function(event) {
    userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    buttonPressed++;
    indexOfLastAnswer = buttonPressed - 1;
    if (buttonPressed == level + 1){
        checkAnswer(indexOfLastAnswer);
        buttonPressed = 0;
    }
    else {
        checkAnswer(indexOfLastAnswer);
        console.log("You still need to press a button.");
    }
});




