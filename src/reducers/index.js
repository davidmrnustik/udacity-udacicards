// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD_TO_DECK,
} from '../actions';
import type { Action } from '../utils/types';

function decks(state = {}, action: Action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: {
          ...action.deck,
        }
      };
    case ADD_CARD_TO_DECK:
      const { card, deck } = action.payload;
        return {
          ...state,
          [deck]: {
            ...state[deck],
            questions: [
              ...state[deck]['questions'],
              card,
            ]
          }
        };
    default:
      return state;
  }
}

export default combineReducers({
  decks,
  form: formReducer,
})