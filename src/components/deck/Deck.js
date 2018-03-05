import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

/**
  * Deck stateless component renders deck on deck list page.
  */
const Deck = ({ title, questionLength, navigation, onPress }) => {
  return (
    <View>
      <Text>{title}</Text>
      <TouchableOpacity
        onPress={onPress}>
        <Text>Detail</Text>
      </TouchableOpacity>
      <Text>{questionLength} {questionLength > 1 ? 'cards' : 'card'}</Text>
    </View>
  )
}

Deck.propTypes = {
  title: PropTypes.string,
  questionLength: PropTypes.number,
  onPress: PropTypes.func,
  navigation: PropTypes.object.isRequired
};

export default withNavigation(Deck);
