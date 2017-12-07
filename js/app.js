/*
 * Create a list that holds all of your cards
 */
 
 var cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", 
 "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
 var moves = 0;
 var cardsInTurn = 0;
 var matches = 0;
 
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

function getFigure(item){
	return $(item).children().attr("class");
}

function validateResult(){
	if(cardsInTurn == 2){
		//Get both cards open
		var openCards = $(".open").not(".match");
		//If the have the same figure class, then it is a match!
		if(getFigure(openCards[0]) == getFigure(openCards[1])){
			matches++;
			//Apply match style
			$(openCards[0]).addClass("match");
			$(openCards[1]).addClass("match");
			
			if(matches == 8){
				alert("You win!");
			}
		}else{
			//Hide both cards
			//Reset the class to be only "card"
			$(openCards[0]).attr('class', 'card');	
			$(openCards[1]).attr('class', 'card');	
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
	//If the card is a match, it does not counter
	if(!$(this).hasClass("match")){
		//If the card is not open, then open it
		if(!$(this).hasClass("open")){
			//Open it by adding the class
			$(this).attr("class", "card open show");
		}else{
			//Close the card
			$(this).removeClass("open show");
		}
		//Increment the moves
		moves++;
		updateMoves();
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
	updateMoves();
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
	shuffle(cards);
	assignCards();
	$(".card").click(clickCard);
	$(".card").click(validateResult);
	$(".restart").click(restartGame);
	updateMoves();
	$(".flip").flip({
        trigger: 'hover'
    });
	
});