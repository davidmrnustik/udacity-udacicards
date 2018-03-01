import { RECEIVE_DECKS, ADD_DECK } from '../actions';

function decks(state = [], action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        decks: {
          ...state,
          ...action.decks,
        }
      };
      case ADD_DECK:
        return {
          decks: {
            ...state,
            ...action.deck,
          },
        };
    default:
      return state;
  }
}

export default decks;