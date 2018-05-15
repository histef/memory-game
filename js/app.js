/* ME: need to reassign each card to the shuffled icon 
 * Create a list that holds all of your cards--ME:create an array that holds the li's??
 * 
 */ 

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

/*ME: remove class names from <i> then add classname from array + 'fa'
function arrayToIconTag(){
const grabIconTag = document.getElementsByTag('i');
for(let i = 0, i < grabIconTag.length; i++){
let iconTag = grabIconTag.classList.remove('fa-*');
iconTag = grabIconTag.classList.add(cardArray[i]);
}
return iconTag;
}
*/

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
***StackOverflow Example:
function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// Add the contents of options[0] to #foo:
document.getElementById('foo').appendChild(makeUL(options[0]));
***end of example

*/

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

 /*(1): add event listener on parent. e.target*/
const flipCard = function(e){
	if (e.target.nodeName.toLowerCase() === 'li'){
			e.target.classList.add('show');
	}
};

grabLi.addEventListener('click', flipCard);

/*(2)*/
let showCardList = [];

const liItem = grabLi.querySelectorAll('.card'); /*this is working*/
/*check each li for a class name show. grabbing nodelist item can't use push cuz its an array method? push the i */
liItem.forEach(function(i){
	if (i.classList.contains('show') === true){
	showCardList.push(i);
	}
	return showCardList;
});

console.log(showCardList);

/* if (showCardList[0] === showCardList[1]){
	match!!!
}
*/

/* if (showCardList[0] !== showCardList[1]){
	no match, flip cards back to hidden.
}
*/