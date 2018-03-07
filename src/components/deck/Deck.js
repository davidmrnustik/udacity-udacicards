import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { commonColor } from '../../utils/variables';

/**
  * Deck stateless component renders deck on deck list page.
  */
const Deck = ({ title, questionLength, navigation, onPress }) => {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={commonColor.buttonUnderlayColor}
      onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cards}>{questionLength} {questionLength > 1 ? 'cards' : 'card'}</Text>
      </View>
    </TouchableHighlight>
  )
}

Deck.propTypes = {
  title: PropTypes.string,
  questionLength: PropTypes.number,
  onPress: PropTypes.func,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  title: {
    color: commonColor.turquoise,
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 2,
  },
  cards: {
    textAlign: 'center',
    color: commonColor.brown,
  }
})

export default withNavigation(Deck);
