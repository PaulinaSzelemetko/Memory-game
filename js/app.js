// MEMORY GAME

// Create an array that holds all of cards
 
let array = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
]

// Global variables

let moves = 0;
let seconds = 1;
let minutes = 0;
let score = 3;
let start = false; 
const matchCards = document.getElementsByClassName('match');
const modal = document.getElementsByClassName('modal')[0];
const modalContent = document.getElementsByClassName('modal-content-text')[0];


// Waiting for DOM Loading

document.addEventListener('DOMContentLoaded', function() {
    prepareDeck(array);
}) 

// Prepare deck function 

function prepareDeck(array) {
    removeCards();
    shuffle(array);
    addCards(array);
}

 function removeCards () {
    const deck = document.getElementsByClassName('deck')[0];
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
}

// Create cards

function createCard (iconName) {  
    const card = document.createElement('li');
    const icon = document.createElement('i');

    card.appendChild(icon);
    card.classList.add('card');
    icon.classList.add('fa', iconName);

    card.addEventListener('click', function() {
        
        if (start === false){
             timeStart(seconds);
             start = true;
        }
       
        removeStars(moves);

        // Compare open cards

        if(this.classList.contains('match') || this.classList.contains('show')) {
            return;
        }
        
        let openCards = document.getElementsByClassName('open');

        if (openCards.length === 2) {
            openCards.item(1).classList.remove('show','open');
            openCards.item(0).classList.remove('show','open');
            this.classList.add('show', 'open');
            return;
        }

        if (openCards.length === 1) {
           if(compareCards(openCards[0].firstChild, this.firstChild)) {
               openCards[0].classList.add('match');
               openCards[0].classList.remove('show','open');
               this.classList.add('match');
           } else {
               this.classList.add('show', 'open');
           }

           moves++;
           document.getElementsByClassName('moves')[0].textContent = moves;

           if (matchCards.length === 16) {
            endingGame();
            playAgain();
           }
            return;
        } 
        
        if (openCards.length === 0) {
            this.classList.add('show', 'open');
        }


   })

    return card;
}

// Compare cards function 

function compareCards(first, second) {
    for (var i = 0; i < first.classList.length; i++) {
        if (!second.classList.contains(first.classList[i])) {      
            return false;
        }
    }
    return true;
}

// Add cards function 

function addCards (cardNames) {
    const deck = document.getElementsByClassName('deck')[0];
    let card;

    for (var i=0; i<cardNames.length; i++) {
        card = createCard(cardNames[i]);
        deck.appendChild(card);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 // Restart function

const restart = document.getElementsByClassName('restart')[0];

restart.addEventListener('click', function() {
    restartGame();
});


// Remove stars function

function removeStars(moves) {
    
    if (moves === 9) {
        const star = document.getElementsByClassName('fa-star')[0];
        star.style.display='none';
        score = 2;
        return;
    }

    if (moves === 19) {
        const star = document.getElementsByClassName('fa-star')[1];
        star.style.display='none';
        score = 1;
        return;
    }
    
    if ( moves === 29) {
        const star = document.getElementsByClassName('fa-star')[2];
        star.style.display='none';
        score = 0;
        return;
    }
}

//Timer (time-start and time-create function)

let interval;
let timer;

function timeStart(seconds) {
    
    timer = document.getElementsByClassName('timer')[0];
    interval = setInterval(createTime, 1000);
}

function createTime() {
    seconds++;

    if (seconds > 59) {
        minutes ++;
        seconds = 0;
    }
    if (seconds < 10) {
        timer.innerHTML = '0' + minutes + ':' + '0' + seconds;
    }
    if (seconds >= 10) {
        timer.innerHTML = '0' + minutes + ':'  + seconds;
    }
    if (minutes >=10) {
        timer.innerHTML = minutes + ':' + '0' + seconds;
    }
    }


// Ending game function (show modal window)

function endingGame() {
    let timer = document.getElementsByClassName('timer')[0].textContent;
    modal.style.display = 'block';
    modalContent.innerHTML = '<h1>Congratulations! You won!</h1> Your time: ' + timer + '<br>' +  'Your moves: ' + moves + '<br>' + 'Your stars: ' + score;

    
}

//Play again function (button in modal window)

function playAgain() {
    const button = document.getElementsByClassName('play-again')[0];
    button.addEventListener('click', function() {
        modal.style.display = 'none';
        restartGame();  
    })
}

function restartGame() {
    prepareDeck(array);
    moves=0;
    start = false;
    minutes = 0;
    seconds = 0;
    score = 3;
    timer.innerHTML = '00:00';
    document.getElementsByClassName('moves')[0].textContent = moves;
    clearInterval(interval);
    var stars = document.getElementsByClassName('fa-star');
    for(var i = 0; i < stars.length; i++) {
        stars[i].style.display = 'block';
    }
}

 



