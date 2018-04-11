/*
 * Create an array that holds all of cards
 */
var array = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb"
]

// Global variables

var moves = 0;
var seconds = 1;
var minutes = 0;
var start = false; 
var matchCards = document.getElementsByClassName("match");
var modal = document.getElementsByClassName("modal")[0];
var modalContent = document.getElementsByClassName("modal-content-text")[0];


//DOM Loading

document.addEventListener("DOMContentLoaded", function() {
    prepareDeck(array);
}) 

//Prepare deck
function prepareDeck(array) {
    removeCards();
    shuffle(array);
    addCards(array);
}

 function removeCards () {
    var deck = document.getElementsByClassName("deck")[0];
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
}

//Create cards and compare open cards

function createCard (iconName) {
    var card = document.createElement("li");
    var icon = document.createElement("i");

    card.appendChild(icon);
    card.classList.add("card");
    icon.classList.add("fa", iconName);

    card.addEventListener("click", function() {
        
        if (start === false){
             timeStart(seconds);
             start = true;
        }
       
        removeStars(moves);

        if(this.classList.contains("match") || this.classList.contains("show")) {
            return;
        }
        
        var openCards = document.getElementsByClassName("open");

        if (openCards.length === 2) {
            openCards.item(1).classList.remove("show","open");
            openCards.item(0).classList.remove("show","open");
            this.classList.add("show", "open");
            return;
        }

        if (openCards.length === 1) {
           if(compareCards(openCards[0].firstChild, this.firstChild)) {
               openCards[0].classList.add("match");
               openCards[0].classList.remove("show","open");
               this.classList.add("match");
           } else {
               this.classList.add("show", "open");
           }

           moves++;
           document.getElementsByClassName("moves")[0].textContent = moves;

           return;
        } 
        
        if (openCards.length === 0) {
            this.classList.add("show", "open");
        }

        // Ending game 

        if (matchCards.length === 15) {
            endingGame();
            playAgain();
        } else {
            return;
        }
   })

    return card;
}

function compareCards(first, second) {
    for (var i = 0; i < first.classList.length; i++) {
        if (!second.classList.contains(first.classList[i])) {      
            return false;
        }
    }
    return true;
}


function addCards (cardNames) {
    var deck = document.getElementsByClassName("deck")[0];
    var card;

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

 // Restart 

var restart = document.getElementsByClassName("restart")[0];

restart.addEventListener("click", function restart() {
    prepareDeck(array);
    moves=0;
    start = false;
    minutes = 0;
    seconds = 0;
    timer.innerHTML = "00:00";
    document.getElementsByClassName("moves")[0].textContent = moves;
    clearInterval(interwal);
});


// Remove stars

function removeStars(moves) {
    var stars = document.getElementsByClassName("stars")[0];
    if (moves === 9 || moves === 19 || moves === 29) {
        stars.removeChild(stars.childNodes[0]);
    }
    return;
}

//Timer

var interwal;
var timer;

function timeStart(seconds) {
    
    timer = document.getElementsByClassName("timer")[0];
    interwal = setInterval(createTime, 1000);
}

function createTime() {
    seconds++;

    if (seconds > 59) {
        minutes ++;
        seconds = 0;
    }
    if (seconds < 10) {
        timer.innerHTML = "0" + minutes + ":" + "0" + seconds;
    }
    if (seconds >= 10) {
        timer.innerHTML = "0" + minutes + ":"  + seconds;
    }
    if (minutes >=10) {
        timer.innerHTML = minutes + ":" + "0" + seconds;
    }
    }


// Ending game function

function endingGame() {
    var timer = document.getElementsByClassName("timer")[0].textContent;
    modal.style.display = "block";
    modalContent.innerHTML = "<h1>Congratulations! You won!</h1> Your time: " + timer + "<br>" +  "Your moves: " + moves;

    
}

//Play again button (modal window)

function playAgain() {
    var button = document.getElementsByClassName("play-again")[0];
    button.addEventListener("click", function() {
        modal.style.display = "none";
        prepareDeck(array);
        moves=0;
        start = false;
        minutes = 0;
        seconds = 0;
        timer.innerHTML = "00:00";
        document.getElementsByClassName("moves")[0].textContent = moves;
        clearInterval(interwal);
     
    });
}

 



