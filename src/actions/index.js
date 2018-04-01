// @flow

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
import type {
  DecksAction,
  DecksType,
  DeckAction,
  DeckType,
  CardType,
  CardToDeckAction,
} from '../utils/types';

export function receiveDecks (decks: DecksType): DecksAction {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck: DeckType): DeckAction {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addCardToDeck (card: CardType, deck: CardToDeckAction) {
  return {
    type: ADD_CARD_TO_DECK,
    payload: {
      card,
      deck,
    }
  }
}