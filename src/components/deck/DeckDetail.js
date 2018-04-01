// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { DeckType, NavigationType } from '../../utils/types';
import { commonColor, commonStyle } from '../../utils/variables';

type PropsType = {
  deck: DeckType,
  navigation: NavigationType,
}

/**
  * DeckDetail renders deck detail.
  * It receives decks props and deckId parsed from navigation params.
  */
class DeckDetail extends PureComponent<PropsType> {
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cards}>{length} {length > 1 ? 'cards' : 'card'}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNewCard', {
              deckId: title,
            })}
            style={[commonStyle.buttonInverse, styles.addCard]}
          >
            <Text style={commonStyle.buttonTextInverse}>Add a card</Text>
          </TouchableOpacity>
          {length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Quiz', {
                deckId: title,
              })}
              style={commonStyle.button}
            >
              <Text style={commonStyle.buttonText}>Start Quiz</Text>
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
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    paddingHorizontal: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: commonColor.turquoise
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCard: {
    marginBottom: 20,
  },
  cards: {
    color: commonColor.brown
  }
})

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  return {
    deck: decks[deckId],
  }
}

export default connect(mapStateToProps)(DeckDetail);
