// @flow

import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD_TO_DECK,
} from '../actions';

export type QuestionType = {
  question: string,
  answer: string,
}

export type CardType = Array<QuestionType>;

export type DeckType = {
  title: string,
  questions: CardType,
};

export type DecksType = {
  [key: string]: {
    ...DeckType,
  },
}

type ActionType = typeof RECEIVE_DECKS | typeof ADD_DECK | typeof ADD_CARD_TO_DECK;

export type DecksAction = { type: ActionType, decks: DecksType };
export type DeckAction = { type: ActionType, deck: DeckType };
export type CardToDeckAction = { type: ActionType, payload: {
  card: CardType,
  deck: string,
} };

export type Action =
  | DecksAction
  | DeckAction
  | CardToDeckAction;

type PromiseAction = Promise<Action>;

type Dispatch = (action: Action | PromiseAction) => any;

export type NavigationType = {
  navigate: (route: string, {}) => any,
  dispatch: Dispatch,
  goBack: () => void,
  state: {
    params: {
      [key: string]: string
    }
  } 
}

export type StyleType = {
  [key: string]: string | number,
}