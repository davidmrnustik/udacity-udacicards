import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
  * DeckDetail renders deck detail.
  * It receives decks props and deckId parsed from navigation params.
  */
class DeckDetail extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId,
    }
  }
  render() {
    const { navigation, deck } = this.props;
    const length = deck.questions.length;
    const { title } = deck;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>{title}</Text>
          <Text>{length} {length > 1 ? 'cards' : 'card'}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNewCard', {
              deckId: title,
            })}
          >
            <Text>Add a card</Text>
          </TouchableOpacity>
          {length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Quiz', {
                deckId: title,
              })}
            >
              <Text>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  return {
    deck: decks[deckId],
  }
}

export default connect(mapStateToProps)(DeckDetail);
