// @flow

import React from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { StyleType } from '../../utils/types';

type PropsType = {
  onPress: () => void,
  text: string,
  status: string,
  styleButton: StyleType | Array<StyleType>,
  styleButtonText: StyleType,
}

const CardButton = ({
  onPress,
  text,
  status,
  styleButton,
  styleButtonText
}: PropsType) => (
  <TouchableOpacity
    onPress={status === 'question'
      ? () => Alert.alert('You have to answer first.')
      : onPress}
    style={styleButton}
  >
    <Text style={styleButtonText}>{text}</Text>
  </TouchableOpacity>
)
export default CardButton;
