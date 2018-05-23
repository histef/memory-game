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

/* Create board:Display the cards on the page
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/*timer*/
let mins = 0;
let secs = 0;
let interval;

let isGameOn = false; 

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
    /*matchin pair*/
    if (showCardList[0].innerHTML === showCardList[1].innerHTML) {
        showCardList[0].classList.add('match');
        showCardList[1].classList.add('match');
        showCardList.splice(0, 2);
        matchCount++;
    }
    /*not a matching pair*/
    else {
        setTimeout(function() {
            showCardList[0].classList.remove('show');
            showCardList[1].classList.remove('show');
            showCardList[0].classList.toggle('mismatch');
            showCardList[1].classList.toggle('mismatch');
            showCardList.splice(0, 2);
        }, 1500);
        showCardList[0].classList.toggle('mismatch');
        showCardList[1].classList.toggle('mismatch');
        starsPanel();
    };
};

/*star rating/lives counter*/
const wrongMove = document.querySelector('.wrongMove');
let wrongMoveCounter = 0;

function starsPanel() {
    if (showCardList[0].innerHTML !== showCardList[1].innerHTML){
        wrongMoveCounter++;
    }
    if (wrongMoveCounter % 3 === 0) {
        const getStar = document.querySelector('.fa-star');
        getStar.remove();
        starCounter--;
        wrongMove.textContent--;
    }
    setTimeout(function() {
        if (starCounter === 0) {
            alert('you\'ve lost. Give it another go!');
            clearInterval(interval);
            /*reset game modal?*/
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
    wrongMoveCounter = 0;
    wrongMove.textContent = 3;
    secs = 0;
    mins = 0;
    clearInterval(interval);
    document.querySelector('.timer').innerHTML = `0:0`;
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
        moveCount++;
        grabMoves.textContent++;
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

/*Modal*/
var modal = document.querySelector('#myModal');
var closeBtn = document.querySelector(".closeBtn");
 
function winModal() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

const resetIcon = document.querySelector('.reset');
grabDeck.addEventListener('click', timer);
grabDeck.addEventListener('click', flipCard);
resetIcon.addEventListener('click', reset);