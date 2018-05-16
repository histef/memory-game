/* Reassign each card with a shuffled icon */

/*shuffled icon array*/
const cardArray = ['fa-diamond',
				   'fa-diamond',
				   'fa-paper-plane-o',
				   'fa-paper-plane-o',
				   'fa-anchor',
				   'fa-anchor',
				   'fa-bolt',
				   'fa-bolt',
				   'fa-cube',
				   'fa-cube',
				   'fa-bomb',
				   'fa-bomb',
				   'fa-leaf',
				   'fa-leaf',
				   'fa-bicycle',
				   'fa-bicycle'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML--ME: attach i to li???
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardArray) {
    var currentIndex = cardArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = temporaryValue;
    }

    return cardArray;
}

 /*ME:  add each element[i] in JS array to the existing li's in html*/
/*attach card(li) to UL */

shuffle(cardArray);

const cardFragment = document.createDocumentFragment();
const grabLi = document.querySelector('.deck');

cardArray.forEach(function(i){
	grabLi.innerHTML = '';

	const createLi = document.createElement('li');
	createLi.classList.add("card");
	createLi.innerHTML = `<i class="fa ${i}"></i>`;
	cardFragment.appendChild(createLi);
});
document.querySelector('.deck').appendChild(cardFragment);


/*
 * (1)set up the event listener for a card. If a card is clicked:
 *  (1a) display the card's symbol (put this functionality in another function that you call from this one)
 * (2)- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)--.push();
 *  - if the list already has another card, check to see if the two cards match--if/else
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)--e.preventdefault
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)--for loop
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*(1): add event listener on parent. e.target
* (2):  push e.target to clicked card list;
*/
let showCardList = [];
let matchCount = 0;
let starCounter = 3;

function checkMatch(){ 
	if (showCardList[0].innerHTML === showCardList[1].innerHTML){
		showCardList[0].classList.add('match');
		showCardList[1].classList.add('match');
		showCardList.splice(0,2);
		matchCount++;
	} 
	else /*if (showCardList[0] !== showCardList[1])*/{
		setTimeout(function(){
			showCardList[0].classList.remove('show');
			showCardList[1].classList.remove('show');
			showCardList[0].classList.toggle('mismatch');
			showCardList[1].classList.toggle('mismatch');
			showCardList.splice(0, 2);
		}, 1000);
		showCardList[0].classList.toggle('mismatch');
		showCardList[1].classList.toggle('mismatch');
		/*remove star*/
		starCounter--;
		if (starCounter === 0){
			alert('you\'ve lost. Give it another go!');
			/*reset game*/
		}
	};
};

/*event listener, run game*/
const flipCard = function(e){
	if (e.target.nodeName.toLowerCase() === 'li'
		&& !e.target.classList.contains('show')
		&& showCardList.length < 2){
			e.target.classList.add('show');
			showCardList.push(e.target);
	}
	/*have to run checkMatch() in here, to call function*/
	/*check if two showing cards match function*/
	if (showCardList.length === 2){
			checkMatch();
		};

	/*win game, run modal*/
	if(matchCount === 8) {
		setTimeout(function(){
		alert('you won!!!');
		}, 1000);
	}
};

grabLi.addEventListener('click', flipCard);

