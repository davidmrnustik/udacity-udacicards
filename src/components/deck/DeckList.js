import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DeckList = ({ navigation, decks }) => (
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
);

function mapStateToProps({ decks }) {
  return {
    decks
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

export default connect(mapStateToProps)(DeckList);
