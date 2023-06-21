// Define the Card object constructor
function Card(name, value, color, group) {
  this.name = name;
  this.value = value;
  this.color = color;
  this.group = group;
}

// Create the deck of cards
var deck = [];
var remainingDeck = [];

// Function to create the deck of cards
function createDeck() {
    var groups = ['diamonds', 'spades', 'clubs', 'hearts'];
    var names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];

        for (var j = 0; j < names.length; j++) {
            var name = names[j];
            var value = j + 1; // Assuming the value is the index position + 1
            var color = (group === 'diamonds' || group === 'hearts') ? 'red' : 'black';

            var card = {
                name: name,
                value: value,
                color: color,
                group: group
            };

            deck.push(card);
        }
    }

    // Make a copy of the deck for remainingDeck
    remainingDeck = deck.slice();
}


// Function to shuffle the deck
function shuffleDeck() {
  var currentIndex = deck.length;
  var temporaryValue, randomIndex;

  // While there are remaining elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap the current element with the random element
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
}


// Function to distribute cards for round 1
function distributeCardsForRound1() {
  // Clear the player hands
  playerAHandCount = 0;
  playerBHandCount = 0;

  // Clear the HTML elements for playerA and playerB cards
  var playerACardsContainer = document.getElementById("playerA-cards");
  playerACardsContainer.innerHTML = "";
  var playerBCardsContainer = document.getElementById("playerB-cards");
  playerBCardsContainer.innerHTML = "";

  // Distribute 6 cards to playerA
  for (var i = 0; i < 6; i++) {
    var card = deck.pop();
	playerACards.push(card);
    playerAHandCount++;
    var cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.textContent = card.name;
    playerACardsContainer.appendChild(cardElement);
  }

  // Distribute 12 cards to playerB
  for (var i = 0; i < 12; i++) {
    var card = deck.pop();
	playerBCards.push(card);
    playerBHandCount++;
    var cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.textContent = card.name;
    playerBCardsContainer.appendChild(cardElement);
  }
}


// Function to distribute cards for round 2
function distributeCardsForRound2() {
  // Clear the player hands
  playerAHandCount = 0;
  playerBHandCount = 0;

  // Clear the HTML elements for playerA and playerB cards
  var playerACardsContainer = document.getElementById("playerA-cards");
  playerACardsContainer.innerHTML = "";
  var playerBCardsContainer = document.getElementById("playerB-cards");
  playerBCardsContainer.innerHTML = "";

  // Distribute 12 cards to playerA
  for (var i = 0; i < 12; i++) {
    var card = remainingDeck.pop();
	playerACards.push(card);
    playerAHandCount++;
    var cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.textContent = card.name;
    playerACardsContainer.appendChild(cardElement);
  }

  // Distribute 6 cards to playerB
  for (var i = 0; i < 6; i++) {
    var card = remainingDeck.pop();
	playerBCards.push(card);
    playerBHandCount++;
    var cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.textContent = card.name;
    playerBCardsContainer.appendChild(cardElement);
  }
}


// Function to calculate points based on the played cards
function calculatePoints(cardA1, cardA2, cardB) {
  if (cardA1.color === cardA2.color) {
    var averageValue = Math.floor((cardA1.value + cardA2.value) / 2);
    return averageValue;
  } else {
    var largerValue = Math.max(cardA1.value, cardA2.value);
    return largerValue;
  }
}

// Game variables
var playerAHandCount = 0;
var playerBHandCount = 0;

// Function to update the scoreboard
function updateScoreboard() {
  var playerAScore = 0;
  var playerBScore = 0;

  // Compare the points for each hand and update the scores
  for (var i = 0; i < playerAHandCount; i += 2) {
    var cardA1 = playerACards[i];
    var cardA2 = playerACards[i + 1];
    var cardB = playerBCards[i / 2];

    var points = calculatePoints(cardA1, cardA2, cardB);

    if (points === cardB.value) {
      playerBScore++;
    } else if (points < cardB.value) {
      playerAScore++;
    }
  }

  // Update the respective HTML elements to display the updated scores
  var playerAScoreElement = document.getElementById("playerA-score");
  playerAScoreElement.textContent = playerAScore.toString();
  var playerBScoreElement = document.getElementById("playerB-score");
  playerBScoreElement.textContent = playerBScore.toString();

  // Compare the scores to determine the winner
  if (playerAScore > playerBScore) {
    // Player A wins
    // Update the respective HTML element to display the winner
    var winnerElement = document.getElementById("winner");
    winnerElement.textContent = "Player A Wins!";
  } else if (playerAScore < playerBScore) {
    // Player B wins
    // Update the respective HTML element to display the winner
    var winnerElement = document.getElementById("winner");
    winnerElement.textContent = "Player B Wins!";
  } else {
    // Tie
    // Update the respective HTML element to display the tie
    var winnerElement = document.getElementById("winner");
    winnerElement.textContent = "It's a Tie!";
  }
}


// Event handlers for player actions
// Event handler for toggling cards
function toggleCard(player) {
  var cardsContainer;

  if (player === 'A') {
    cardsContainer = document.getElementById('playerA-cards');
  } else if (player === 'B') {
    cardsContainer = document.getElementById('playerB-cards');
  }

  cardsContainer.addEventListener('click', function (event) {
    var cardElement = event.target;

    // Toggle the selected card's class to highlight/unhighlight it
    cardElement.classList.toggle('selected');
  });
}

// Event handler for playing a hand
function playHand() {
  var playerACardsContainer = document.getElementById('playerA-cards');
  var selectedCards = playerACardsContainer.getElementsByClassName('selected');

  if (selectedCards.length === 2) {
    // Get the selected cards' values
    var cardA1Value = parseInt(selectedCards[0].textContent);
    var cardA2Value = parseInt(selectedCards[1].textContent);

    // Get the corresponding card for player B
    var cardB = playerBCards[playerAHandCount / 2];

    // Calculate the points for the hand
    var points = calculatePoints(cardA1Value, cardA2Value, cardB);

    // Update the scoreboard and perform other necessary actions
    updateScoreboard();
    // ...
  } else {
    // Display an error message or take appropriate action
    console.log('Please select exactly 2 cards to play a hand.');
  }
}


// Initialize the game

// Function to initialize the game
function initializeGame() {
  // Create the deck of cards
  createDeck();

  // Shuffle the deck
  shuffleDeck();

  // Distribute cards for round 1
  distributeCardsForRound1();

  // Event handler for toggling cards for playerA
  toggleCard('A');

  // Event handler for playing a hand
  var playHandButton = document.getElementById('play-hand');
  playHandButton.addEventListener('click', playHand);
}


// Call the initializeGame function to start the game
initializeGame();
