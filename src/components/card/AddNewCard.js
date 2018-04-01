// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { addCardToDeck } from '../../actions';
import { submitCardToDeck } from '../../utils/api';
import type { CardType, DeckType, NavigationType } from '../../utils/types';
import NewCardForm from './NewCardForm';

type PropsType = {
  deck: DeckType,
  navigation: NavigationType,
  addCardToDeck: (values: DeckType, deckId: string) => void,
}

type StateType = {
  title: string,
  questions: CardType,
}

/**
  * AddNewCard receives data from NewCardForm and handles storage logic.
  * It receives decks props and dispatch addCardToDeck action.
  */
class AddNewCard extends PureComponent<PropsType, StateType> {
  static navigationOptions = {
    title: 'Add new card',
  }
  state = {
    title: '',
    questions: [],
  }
  componentDidMount() {
    this.setState(state => ({
      ...state,
      ...this.props.deck,
    }))
  }
  goBack = () => {
    this.props.navigation.goBack();
  }
  submit = values => {
    const { deckId } = this.props.navigation.state.params;
    
    // Update redux
    this.props.addCardToDeck(values, deckId);

    this.setState(state => ({
      ...state,
      ...this.props.deck,
      questions: [
        ...this.props.deck['questions'],
        values,
      ]
    }), () => {
      // Save to 'DB'
      submitCardToDeck(this.state, deckId);
    })
    this.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={130}
        >
          <NewCardForm onSubmit={this.submit} />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ decks }, ownProps) => ({
  deck: decks[ownProps.navigation.state.params.deckId],
})

export default connect(mapStateToProps, { addCardToDeck })(AddNewCard);