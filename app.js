'use strict';

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Constants
const CARD_TYPES = ["club", "diamond", "heart", "spade"];
const ACTION_CARDS = ["A", "K", "Q", "J"];

// Variables
let deck = [];
let players = [];
let openCard=[]
let currentPlayerIndex = 0;
let currentCard = null;
let direction = 1;
let draw = false;
let winner = null;

// Helper functions
function createDeck() {
  const deck = [];
  CARD_TYPES.forEach((type) => {
    for (let i = 2; i <= 10; i++) {
      deck.push({ type, number: i });
    }
    ACTION_CARDS.forEach((card) => {
      deck.push({ type, card });
  });
  });
  return deck;
}

// shuffles all the cards
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
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
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < 5; j++) {
      players[i].cards.push(deck.pop());
    }
  }
  openCard = deck.pop();
}

function getNextPlayer() {
  return players[currentPlayerIndex + direction];
}

function plus2Plus4Card(number){

}

function getNextCard() {
  const card = deck.pop();
  if (card.type === "J") {
    players[currentPlayerIndex + direction].cards.push(...Array(4).fill({}));
  } else if (card.type === "Q") {
    getNextPlayer().cards.push(...Array(2).fill({}));
  } else if (card.type === "K") {
    direction *= -1;
  } else if (card.type === "A") {
    getNextPlayer().skipTurn = true;
  }
  return card;
}

function isValidMove(card) {
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


function checkForPowerCard(){

}
// Actual move of the player
function ActualMove(){
if(canPlay() && (draw === false || winner === null)){
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

function nextTurn() {
  currentPlayerIndex = getNextPlayerIndex();
  if (players[currentPlayerIndex].skipTurn) {
    players[currentPlayerIndex].skipTurn = false;
    nextTurn();
  }
  io.emit("playerTurn", currentPlayerIndex);
}

// checks if the current Player is the winner
function checkForWinner() {
  if(players[currentPlayerIndex].cards.length===0)
  {
    winner = players[currentPlayerIndex].name;
  }
}

