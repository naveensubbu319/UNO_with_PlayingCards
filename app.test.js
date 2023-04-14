const { createDeck } = require('./app.js');

const CARD_TYPES = ["club", "diamond", "heart", "spade"];
const ACTION_CARDS = ["A", "K", "Q", "J"];

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