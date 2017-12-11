/*
 * Create a list that holds all of your cards
 */
 
	var cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", 
		"fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
	var moves = 0;
	var cardsInTurn = 0;
	var matches = 0;
	//Star Control
	const looseStarRate = 10;
	//Timer
	var sec = 0;
	var updateTime = true;
 
 //Class match match Class open open
 
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function updateMoves(){
	$(".moves").text(moves);
}

function updateStars(){
		if(moves > looseStarRate){
			$("#star1").attr('class', 'fa fa-star-o');	
		}else{
			$("#star1").attr('class', 'fa fa-star');	
			$("#star2").attr('class', 'fa fa-star');	
			$("#star3").attr('class', 'fa fa-star');	
		}
		if(moves > (looseStarRate * 2)){
			$("#star2").attr('class', 'fa fa-star-o');	
		}else{
			$("#star2").attr('class', 'fa fa-star');	
			$("#star3").attr('class', 'fa fa-star');				
		}
		if(moves > (looseStarRate * 3)){
			$("#star3").attr('class', 'fa fa-star-o');	
		}else{	
			$("#star3").attr('class', 'fa fa-star');				
		}
}

function getFigure(item){
	return $(item).children().attr("class");
}

function validateResult(){
	if(cardsInTurn == 2){
		
		//Increment the moves
		moves++;
		updateMoves();
		updateStars();		
		
		//Get both cards open
		var openCards = $(".open").not(".match");
		//If the have the same figure class, then it is a match!
		if(getFigure(openCards[0]) == getFigure(openCards[1])){
			matches++;
			//Apply match style
			$(openCards[0]).addClass("match");
			$(openCards[1]).addClass("match");
			
			$(openCards[0]).effect("shake", {direction:"up" , distance:10}, 500);
			$(openCards[1]).effect("shake", {direction:"up" , distance:10}, 500);
			
			if(matches == 8){
				updateTime = false;
				showWinScreen();
			}
		}else{
			
				
			//Time out to be 1 second
			var x = 1000;
			
			//show them as wrong both cards
			$(openCards[0]).attr('class', 'card unmatch');	
			$(openCards[1]).attr('class', 'card unmatch');	
			
			//shake them
			$(openCards[0]).effect("shake", {distance:10}, 500);
			$(openCards[1]).effect("shake", {distance:10}, 500);
			
			setTimeout(function(){
				//Reset the class to be only "card"		
			  $(openCards[0]).attr('class', 'card');	
			  $(openCards[1]).attr('class', 'card');	
			}, x);
			
			
		}
		//reset the counter
		cardsInTurn = 0;
	}
	
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function clickCard(){
	//If the game is no long showing a no match
	if($(".unmatch").length == 0 &&
		//and If the card is not already a match
		!$(this).hasClass("match") &&
		//and If the card is not open, then open it
		!$(this).hasClass("open")){
			//Open it by adding the class
			$(this).attr("class", "card open show");
			//Increment the moves in the turn
			cardsInTurn++;
	}
}


function assignCards(){
	//Get all i elements
	var iTabs = $(".deck").find("i");
	iTabs.each(function (index, item){	
		//Reset the class to be only "fa"
		$(this).attr('class', 'fa');
		//get the i item of the html and add the corresponding images
		$(this).addClass(cards[index]);
	});
}

function turnAllCards(){
	//Get all li elements
	var iTabs = $(".deck").find("li");
	iTabs.each(function (index, item){	
		//Reset the class to be only "card"
		$(this).attr('class', 'card');
	});
}

function restartGame(){
	//Shuffle the cards
	shuffle(cards);
	assignCards();
	turnAllCards();
	moves = 0;
	matches = 0;
	cardsInTurn = 0;
	sec = 0;
	$("#seconds").html("00");
	$("#minutes").html("00");
	updateTime = true;
	updateMoves();
	updateStars();
}

function playAgain(){
	//Hide winning message
	$("#winScreen").hide("puff");
	//Restart game
	restartGame();
}
function showWinScreen(){
	$("#winScreen").show("pulsate",1000);
	$("#moveCount").text(moves);
	$("#starCount").text($(".fa-star").length);
	$("#secondsWin").html(pad(sec%60));
	$("#minutesWin").html(pad(parseInt(sec/60,10)));	

}

function flipCard(){
	$("#demo").flip();	
}

function pad (val){ 
	return val > 9 ? val : "0" + val; 
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
$(function (){
	//Shuffle the cards
	$("#winScreen").hide();
	shuffle(cards);
	assignCards();
	$(".card").click(clickCard);
	$(".card").click(validateResult);
	$(".restart").click(restartGame);
	$("#playAgain").click(playAgain);
	$(".demo").click(flipCard);

	
	updateMoves();
    
    setInterval( function(){
		if(updateTime){
			$("#seconds").html(pad(++sec%60));
			$("#minutes").html(pad(parseInt(sec/60,10)));
		}
    }, 1000);
});