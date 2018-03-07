import React from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const CardButton = ({
  onPress,
  text,
  status,
  styleButton,
  styleButtonText
}) => (
  <TouchableOpacity
    onPress={status === 'question'
      ? () => Alert.alert('You have to answer first.')
      : onPress}
    style={styleButton}
  >
    <Text style={styleButtonText}>{text}</Text>
  </TouchableOpacity>
)

CardButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  styleButton: PropTypes.any,
  styleButtonText: PropTypes.object,
};

export default CardButton;
