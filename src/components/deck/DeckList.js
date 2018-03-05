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

/**
  * DeckList renders list of decks, it's consider as a home page.
  * It receives decks props and dispatch receiveDecks action.
  */
class DeckList extends PureComponent {
  state = {
    loading: false,
  }
  componentDidMount() {
    this.setState({ saving: true });
    getDecks()
      .then(decks => this.props.receiveDecks(decks))
      .then(() => this.setState(() =>({
        loading: false,
      })))
  }
  render() {
    const { navigation, decks } = this.props;
    const { loading } = this.state;
    const length = Object.keys(decks).length;
    if (loading) {
      return <Text>Loading...</Text>
    }

    return (
      <View style={styles.container}>
        <Text>Deck List</Text>
        <ScrollView contentContainerStyle={styles.decks}>
          {length > 0
            ? Object.keys(decks).map((deck, index) => {
                const { title, questions } = decks[deck];
                const questionLength = questions.length;
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
                      <Text>{questionLength} {questionLength > 1 ? 'cards' : 'card'}</Text>
                    </View>
                  )
              })
            : <Text>There are no decks here.</Text>
          }
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
