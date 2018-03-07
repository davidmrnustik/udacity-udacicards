import React, { PureComponent } from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/configureStore';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { setLocalNotification } from './src/utils/helpers';
import DeckList from './src/components/deck/DeckList';
import AddNewDeck from './src/components/deck/AddNewDeck';
import DeckDetail from './src/components/deck/DeckDetail';
import Quiz from './src/components/card/Quiz';
import { Constants } from 'expo';
import AddNewCard from './src/components/card/AddNewCard';
import { commonColor } from './src/utils/variables';

const AppStatusBar = () => (
  <View style={{height: Constants.statusBarHeight}}>
    <StatusBar />
  </View>
)

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />,
      
    },
  },
  AddNewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <Feather name='plus-square' size={25} color={tintColor} />
    },
  }
},{
  tabBarOptions: {
    activeTintColor: commonColor.brown,
    inactiveTintColor: commonColor.brownLight,
    activeBackgroundColor: commonColor.grey,
    indicatorStyle: {
      borderBottomColor: commonColor.brownLight,
      borderBottomWidth: 2,
      backgroundColor: 'transparent',
    },
    style: {
      paddingTop: Platform.OS === 'ios' ? 0 : 20,
      backgroundColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
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
    navigationOptions: {
      headerStyle: {
        paddingTop: 0,
      }
    }
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
  },
});
