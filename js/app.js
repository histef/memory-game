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
    'fa-bicycle'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML--ME: attach i to li???
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardArray) {
    var currentIndex = cardArray.length,
        temporaryValue, randomIndex;

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


const cardFragment = document.createDocumentFragment();
const grabDeck = document.querySelector('.deck');

function createBoard() {
    shuffle(cardArray);
    grabDeck.innerHTML = '';

    cardArray.forEach(function(i) {

        const createLi = document.createElement('li');
        createLi.classList.add("card");
        createLi.innerHTML = `<i class="fa ${i}"></i>`;
        cardFragment.appendChild(createLi);
    });
    document.querySelector('.deck').appendChild(cardFragment);
};

createBoard();

let mins = 0; //todo: figure out how to add a leading zero
let secs = 0;
let interval;

let isGameOn = false; /*is game running? set to no. until card clicked (timer set)*/

function timer() {
    if (!isGameOn) {
        interval = setInterval(function() {
            document.querySelector('.timer').innerHTML = `${mins} : ${secs}`;
            secs++;
            if (secs % 60 === 0) {
                mins++;
                secs = 0;
            }
        }, 1000);
        isGameOn = true;
    }
}

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
let moveCount = 0;
const grabMoves = document.querySelector('.moves');

function checkMatch() {
    if (showCardList[0].innerHTML === showCardList[1].innerHTML) {
        showCardList[0].classList.add('match');
        showCardList[1].classList.add('match');
        showCardList.splice(0, 2);
        matchCount++;
    } else /*if (showCardList[0].innerHTML !== showCardList[1].innerHTML)*/ {
        setTimeout(function() {
            showCardList[0].classList.remove('show');
            showCardList[1].classList.remove('show');
            showCardList[0].classList.toggle('mismatch');
            showCardList[1].classList.toggle('mismatch');
            showCardList.splice(0, 2);
        }, 1500);
        showCardList[0].classList.toggle('mismatch');
        showCardList[1].classList.toggle('mismatch');
        /*remove star function*/
        moveCount++;
        grabMoves.textContent++;
        starsPanel();
    };
};

const wrongMove = document.querySelector('.wrongMove');

function starsPanel() {
    if (moveCount % 3 === 0) {
        const getStar = document.querySelector('.fa-star');
        getStar.remove();
        starCounter--;
        wrongMove.textContent--;
    }
    setTimeout(function() {
        if (starCounter === 0) {
            alert('you\'ve lost. Give it another go!');
            clearInterval(interval);
            /*reset game modal*/
        }
    }, 0);
};


const grabStars = document.querySelector('.stars');

function resetStars() {
    grabStars.innerHTML = '';
    for (i = 0; i < 3; i++) {
        const createStar = document.createElement('li');
        createStar.innerHTML = `<i class="fa fa-star"></i>`;
        grabStars.appendChild(createStar);
    }
};


function reset() {
    showCardList = [];
    matchCount = 0;
    starCounter = 3;
    moveCount = 0;
    grabMoves.textContent = 0;
    wrongMove.textContent = 3;
    secs = 0;
    mins = 0;
    clearInterval(interval);
    createBoard();
    resetStars();
    isGameOn = false;
}

/*event listener, run game*/
const flipCard = function(e) {
    if (e.target.nodeName.toLowerCase() === 'li' &&
        !e.target.classList.contains('show') &&
        showCardList.length < 2) {
        e.target.classList.add('show');
        showCardList.push(e.target);
    }
    /*have to run checkMatch() in here, to call function*/
    /*check if two showing cards match function*/
    if (showCardList.length === 2) {
        checkMatch();
    };

    /*win game, run modal*/
    if (matchCount === 8) {
        setTimeout(function() {
            winModal();
        }, 1000);
        clearInterval(interval);
        /*stop timer and display time*/
    }
};

const resetIcon = document.querySelector('.reset');

// Get the modal
var modal = document.querySelector('#myModal');

// Get the <span> element that closes the modal
var closeBtn = document.querySelector(".closeBtn");

// When the user clicks the button, open the modal 
function winModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

grabDeck.addEventListener('click', timer);
grabDeck.addEventListener('click', flipCard);
resetIcon.addEventListener('click', reset);