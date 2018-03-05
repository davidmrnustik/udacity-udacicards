import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { addCardToDeck } from '../../actions';
import { submitCardToDeck } from '../../utils/api';
import NewCardForm from './NewCardForm';

class AddNewCard extends PureComponent {
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
      <View>
        <Text>Add new card</Text>
        <NewCardForm onSubmit={this.submit} />
      </View>
    )
  }
}

const mapStateToProps = ({ decks }, ownProps) => ({
  deck: decks[ownProps.navigation.state.params.deckId],
})

export default connect(mapStateToProps, { addCardToDeck })(AddNewCard);