import React, { PureComponent } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/configureStore';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { setLocalNotification } from './src/utils/helpers';
import DeckList from './src/components/deck/DeckList';
import AddNewDeck from './src/components/deck/AddNewDeck';
import DeckDetail from './src/components/deck/DeckDetail';
import Quiz from './src/components/card/Quiz';
import AddNewCard from './src/components/card/AddNewCard';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: () => <FontAwesome name='book' size={30} color="black" />
    },
  },
  AddNewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: () => <FontAwesome name='plus-square' size={30} color="black" />
    },
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  Quiz: {
    screen: Quiz,
  },
  AddNewCard: {
    screen: AddNewCard,
  },
})

/**
  * App handles MainNavigator that contains Stack and Tab Navigator.
  * Stack Navigator handles Tab Navigator Tabs, Deck Detail, Quiz
  * and Add New Card.
  * Tab Navigator handles Deck List and Add New Deck.
  */
export default class App extends PureComponent {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
});
