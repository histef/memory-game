/*Card Array*/
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

/* Create board:Display the cards on the page*/
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

/*Timer*/
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

/*Match-Not Match Function*/
function checkMatch() {
    /*matching pair*/
    if (showCardList[0].innerHTML === showCardList[1].innerHTML) {
        showCardList[0].classList.add('match');
        showCardList[1].classList.add('match');
        showCardList.splice(0, 2);
        matchCount++;
    }
    /*not a matching pair*/
    else {
        const card = document.querySelectorAll('.deck, .card');
        for (i = 0; i < card.length; i++) {
            card[i].style.cursor = 'none';
        }
        setTimeout(function() {
            showCardList[0].classList.remove('show');
            showCardList[1].classList.remove('show');
            showCardList[0].classList.toggle('mismatch');
            showCardList[1].classList.toggle('mismatch');
            showCardList.splice(0, 2);
            for (i = 0; i < card.length; i++) {
                card[i].style.cursor = 'pointer';
            }

        }, 1500);
        showCardList[0].classList.toggle('mismatch');
        showCardList[1].classList.toggle('mismatch');
        starsPanel();
    };
};

/*Star Rating & Lives Counter*/
const wrongMove = document.querySelector('.wrongMove');
let wrongMoveCounter = 0;

function starsPanel() {
    if (showCardList[0].innerHTML !== showCardList[1].innerHTML) {
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


/*
 *Reset features
 */
const grabStars = document.querySelector('.stars');
const resetIcon = document.querySelector('.reset');

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

/* Play Game*/
let showCardList = [];
let matchCount = 0;
let starCounter = 3;
let moveCount = 0;
const grabMoves = document.querySelector('.moves');

const flipCard = function(e) {
    if (e.target.nodeName.toLowerCase() === 'li' &&
        !e.target.classList.contains('show') &&
        showCardList.length < 2) {
        e.target.classList.add('show');
        showCardList.push(e.target);
    }

    /*check if two showing cards match*/
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
    }
};

/* Win Modal*/
var modal = document.querySelector('.modal');
var closeBtn = document.querySelector(".closeBtn");

function winModal() {
    const finalTime = document.querySelector('.finalTime');
    const finalStars = document.querySelector('.finalStars');
    finalTime.innerHTML = `${mins}:${secs}`;
    finalStars.innerHTML = starCounter;
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

/*Add Event Listeners*/
grabDeck.addEventListener('click', timer);
grabDeck.addEventListener('click', flipCard);
resetIcon.addEventListener('click', reset);