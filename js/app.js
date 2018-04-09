/*
 * Create a list that holds all of your cards
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

var moves = 0;

document.addEventListener("DOMContentLoaded", function() {
    prepareDeck(array);
}) 

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
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

function createCard (iconName) {
    var card = document.createElement("li");
    var icon = document.createElement("i");

    card.appendChild(icon);
    card.classList.add("card");
    icon.classList.add("fa", iconName);

    card.addEventListener("click", function() {
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

 // Restart 

var restart = document.getElementsByClassName("restart")[0];

restart.addEventListener("click", function() {
    prepareDeck(array);
    moves=0;
    document.getElementsByClassName("moves")[0].textContent = moves;
});


