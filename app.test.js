const { createDeck,addPlayers,restart,dealCards } = require('./app.js');

const CARD_TYPES = ["club", "diamond", "heart", "spade"];
const ACTION_CARDS = ["A", "K", "Q", "J"];
let players = [];

beforeEach(() => {
    // Reset players array before each test
    players = [];
  });

test('createDeck returns a deck with 52 cards', () => {
  const deck = createDeck();
  expect(deck.length).toBe(52);
});

test('createDeck returns a deck with all card types', () => {
  const deck = createDeck();
  const cardTypes = deck.map(card => card.type);
  expect(cardTypes).toEqual(expect.arrayContaining(CARD_TYPES));
});

test('createDeck returns a deck with all card values', () => {
  const deck = createDeck();
  const cardValues = deck.map(card => card.card);
  expect(cardValues).toEqual(expect.arrayContaining([...Array(9).keys()].map(i => i + 2).concat(ACTION_CARDS)));
});

test('addPlayers gives an error message when there are already 4 players', () => {
    restart()
    players = addPlayers('Player 1');
    expect(players.length).toBe(1);
    players = addPlayers('Player 2');
    expect(players.length).toBe(2);
    players = addPlayers('Player 3');
    expect(players.length).toBe(3);
    players = addPlayers('Player 4');
    expect(players.length).toBe(4);
    players = addPlayers('Player 5');
    expect(players.length).toBe(4);
  });

test('addPlayers adds a player to the players array when there are less than 4 players', () => {
  let players = [];
  players = addPlayers('Player 1');
  expect(players.length).toBe(1);
  expect(players[0].name).toBe('Player 1');
});

test('all players have exactly 5 cards', () => {
  // Add four players
  addPlayers('Player 1');
  addPlayers('Player 2');
  addPlayers('Player 3');
  addPlayers('Player 4');

  // Deal cards
  dealCards();

  // Check that each player has exactly 5 cards
  for (let i = 0; i < players.length; i++) {
    expect(players[i].cards.length).toEqual(5);
  }
});