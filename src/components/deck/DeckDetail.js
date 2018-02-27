import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
          <Text>{length} {length > 0 ? 'cards' : 'card'}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity>
            <Text>Add a card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Quiz', {
              deckId: title,
            })}
          >
            <Text>Start Quiz</Text>
          </TouchableOpacity>
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

function mapStateToProps({ decks }, ownProps) {
  const deck = Object.keys(decks).filter(deck => decks[deck].title === ownProps.navigation.state.params.deckId)[0];
  return {
    deck: decks[deck],
  }
}

export default connect(mapStateToProps)(DeckDetail);
