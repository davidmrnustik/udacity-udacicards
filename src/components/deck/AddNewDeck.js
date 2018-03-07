import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import NewDeckForm from './NewDeckForm';
import { submitDeck } from '../../utils/api';
import { addDeck } from '../../actions';
import { commonColor } from '../../utils/variables';

/**
  * AddNewDeck receives data from NewDeckForm and handles storage logic.
  * It receives decks props and dispatch addDeck action.
  */
 class AddNewDeck extends PureComponent {
  static propTypes = {
    decks: PropTypes.object,
    navigation: PropTypes.object.isRequired
  }
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
      <View style={styles.container}>
        <Text style={styles.title}>What is your title of your new deck?</Text>
        <NewDeckForm onSubmit={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: commonColor.brown,
  }
})

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps, { addDeck })(AddNewDeck);
