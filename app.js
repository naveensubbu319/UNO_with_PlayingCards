'use strict';

const express = require("express");
const app = express();

// Constants
const CARD_TYPES = ["club", "diamond", "heart", "spade"];
const ACTION_CARDS = ["A", "K", "Q", "J"];

// Variables
let deck = [];
let players = [];
let openCard=[]
let currentPlayerIndex = 0;
let direction = 1;
let draw = false;
let winner = null;

function restart(){
deck = [];
players = [];
openCard=[]
currentPlayerIndex = 0;
direction = 1;
draw = false;
winner = null;
}

// Creates the deck of cards with its card type and a number/power
function createDeck() {
  const deck = [];
  CARD_TYPES.forEach((type) => {
    for (let i = 2; i <= 10; i++) {
      deck.push({ type, card: i });
    }
    ACTION_CARDS.forEach((card) => {
      deck.push({ type, card:card });
  });
  });
  return deck;
}

// shuffles all the cards
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Add a Player when there is less than 4 players 
function addPlayers(playerName) {
  if(players.length<4){
  let player = {
    name:playerName,
    cards:[]
}
  players.push(player);
}else{
  // give error message that can't add more than 4 people
}
}

// Deal 5 cards each to all the players
function dealCards() {
  let deck = createDeck();
  deck = shuffleDeck(deck);
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < 5; j++) {
      players[i].cards.push(deck.pop());
    }
  }
  openCard = deck.pop();
}

// return the index of the next Player in the direction
function nextPlayerIndex(){
  let NextPlayerIndex = (currentPlayerIndex + direction)%(players.length);
  return NextPlayerIndex;
}

// Adds the cards to nexe player when there is +2 or +4
function AddCardsToNextPlayer(number){
  for (let i = 0; i < number; j++) {
    players[currentPlayerIndex + direction].cards.push(deck.pop());
    checkforDraw();
}
  // just moving to the player who took cards .. But the players turn will be skipped in the next step
  nextTurn();
}

// check if the move is valid 
function isValidMove(card,openCard) {
  if (card.type === openCard.type || card.number === openCard.number) {
    return true;
  }else{
  return false;
  }
}

//declare Draw if deck becomes empty
function checkforDraw(){
  if(deck.length===0){
    draw = true;
  }
}

// To check if the player has any playable card
function canPlay() {
  for (let i = 0; i < players[currentPlayerIndex].cards.length; i++) {
    if (isValidMove(players[currentPlayerIndex].cards[i])) {
      return true;
    }
  }
  return false;
}

// check if the opencard is a power card and take the necessary step
function checkForPowerCard(){
  if (openCard.card === "J") {
    AddCardsToNextPlayer(4);
  } else if (openCard.card === "Q") {
    AddCardsToNextPlayer(2);
  } else if (openCard.card === "K") {
    direction *= -1;
  } else if (openCard.card === "A") {
    currentPlayerIndex = nextPlayerIndex();
  }
}


// Actual Action of drooping a card
function makeMove(card){
if(isValidMove(card)){
  let index = players[currentPlayerIndex].cards.indexOf(card);
  if (index > -1) {
    players[currentPlayerIndex].cards.splice(index, 1);
  }
  openCard = card;
}
}

// Actual move of the player
function ActualMove(){
if((draw === false && winner === null)){
  if(canPlay()){
    makeMove(card);
    checkForWinner();
    checkForPowerCard();
    nextTurn();
  }else{
    players[currentPlayerIndex].cards.push(deck.pop());
    checkforDraw();
    nextTurn()
  }
}
}

// making the index move to next Player 
function nextTurn() {
  currentPlayerIndex = nextPlayerIndex();
}

// checks if the current Player is the winner
function checkForWinner() {
  if(players[currentPlayerIndex].cards.length===0)
  {
    winner = players[currentPlayerIndex].name;
  }
}

module.exports = {
  createDeck,
  addPlayers,
  restart,
  dealCards,
  nextPlayerIndex,
  isValidMove
};

