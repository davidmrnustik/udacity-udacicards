import { AsyncStorage } from 'react-native';

export const UDACICARDS_STORAGE_KEY = 'UdaciCards:decks';

const dummyData = {
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
      },
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

function seedData () {
  return AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(dummyData));
}

export function getDecks () {
  // seedData();
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(data => {
      return data === null
        ? seedData()
        : JSON.parse(data);
    })
}

const getStorageInfo = () => {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(data => JSON.parse(data));
}

export function submitCardToDeck (card, deck) {
  return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
    [deck]: card,
  }), () => console.log(getStorageInfo()))
}