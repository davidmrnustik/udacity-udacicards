import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import NewDeckForm from './NewDeckForm';
import { submitDeck } from '../../utils/api';
import { addDeck } from '../../actions';

/**
  * AddNewDeck receives data from NewDeckForm and handles storage logic.
  * It receives decks props and dispatch addDeck action.
  */
 class AddNewDeck extends PureComponent {
  state = {
    deck: {
      title: '',
      questions: [],
    },
    decks: {},
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: {
            deckId: this.state.deck.title
          }
        }),
      ],
    }));
  }

  submit = values => {
    this.setState(state => ({
      deck: {
        ...state.deck,
        title: values.title,
      },
      decks: {
        ...state.decks,
        ...this.props.decks,
        [values.title]: {
          ...state.deck,
          title: values.title,
        }
      }
    }), () => {
      // Update Redux
      this.props.addDeck(this.state.deck);

      // Save to 'DB'
      submitDeck(this.state.decks);

      this.goBack();
    })
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Add New Deck</Text>
        <NewDeckForm onSubmit={this.submit} />
      </View>
    )
  }
}

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps, { addDeck })(AddNewDeck);
