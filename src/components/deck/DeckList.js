import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { receiveDecks } from '../../actions';
import { getDecks } from '../../utils/api';

class DeckList extends PureComponent {
  state = {
    ready: false,
  }

  componentDidMount() {
    getDecks()
      .then(decks => this.props.receiveDecks(decks))
      .then(() => this.setState(() =>({
        ready: true,
      })))
  }
  render() {
    const { navigation, decks } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      return <Text>Loading...</Text>
    }

    return (
      <View style={styles.container}>
        <Text>Deck List</Text>
        <ScrollView contentContainerStyle={styles.decks}>
          {Object.keys(decks).map((deck, index) => {
            const { title, questions } = decks[deck];
            const length = questions.length;
            return (
                <View key={index} style={styles.deck}>
                  <Text>{title}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DeckDetail', {
                      deckId: title
                      }
                    )}>
                    <Text>Detail</Text>
                  </TouchableOpacity>
                  <Text>{length} {length > 1 ? 'cards' : 'card'}</Text>
                </View>
              )
            }
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decks: {
    justifyContent: 'space-between',
  },
  deck: {
    flex: 1,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps, { receiveDecks })(DeckList);