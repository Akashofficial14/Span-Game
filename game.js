var userClickedPattern=[];
var gamePattern=[];

//random number genrate
function sequence(){
 userClickedPattern=[];

 currentLevel++;
 $("h1").text("level "+currentLevel); 
var randomNumber=Math.random();
randomNumber=randomNumber*4;
randomNumber=Math.floor(randomNumber);

var buttonColours=["red", "blue", "green", "yellow"];
var randomChoosenColour=buttonColours[randomNumber];
gamePattern.push(randomChoosenColour);
$("#"+randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//do bar audio ke liye same likhne ki jarrorat nhi hai dono ka input same hi hai 
playsound(randomChoosenColour);
}

$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playsound(userChoosenColor);
    animatepress(userChoosenColor);
    checkanswer(userClickedPattern.length-1);
});

function playsound(name){
var audio=new Audio("sounds/"+name+".mp3");
audio.play();
}

function animatepress(currentColor){
 $("#"+currentColor).addClass("pressed");
  setTimeout (function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

var started=false;
var currentLevel=0;
$("body").keypress(function(){
if(!started){
    $("h1").text("level "+currentLevel);
    sequence();
}
});

function checkanswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
    
    if(gamePattern.length===userClickedPattern.length){
        setTimeout(function(){
            sequence();
        },1000);
    }
}
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
       setTimeout(function(){
    $("body").removeClass("game-over");
       },200);
       $("h1").text("Game Over,Press Any Key to Restart.");
       //jab wrong ho tab startover function ko call kar liya
       startover();
    }
   
}

function startover(){
    //resteing the values
    currentLevel=0;
    gamePattern=[];
    started=false;
}