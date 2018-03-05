import { AsyncStorage } from 'react-native';

export const UDACICARDS_STORAGE_KEY = 'UdaciCards:decks';

function seedData () {
  return AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify({}));
}

export function getDecks () {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(data => {
      return data === null
        ? seedData()
        : JSON.parse(data);
    })
}

export function submitCardToDeck (card, deck) {
  return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
    [deck]: card,
  }));
}

export function submitDeck (decks) {
  return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks));
}