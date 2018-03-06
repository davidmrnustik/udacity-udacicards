import React from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const CardButton = ({ onPress, text, status }) => (
  <TouchableOpacity
    onPress={status === 'question'
      ? () => Alert.alert('You have to answer first.')
      : onPress}
  >
    <Text>{text}</Text>
  </TouchableOpacity>
)

CardButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default CardButton;
