const initialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  'new deck': {
    title: 'new deck',
    questions: []
  },
  'New deck 2': {
    title: 'New deck 2',
    questions: []
  }
}

export function decks(state = initialState, {type, payload}) {
  switch(type) {
    case 'RECEIVE_DECKS':
      return {
        ...state,
      };
      case 'ADD_DECK':
        return {
          ...state,
          ...payload
        };
    default:
      return state;
  }
}