import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CardButton from './CardButton';

/**
  * Stateless component Card renders card detail with props from Quiz.
  */
const Card = ({
  questionIndex,
  length,
  title,
  status,
  last,
  onPressCorrect,
  onPressIncorrect,
  onPressQuestion,
  onPressAnswer,
  onPressRestartQuiz,
  onPressGoBack,
  voted,
  score,
}) => (
  <View style={styles.container}>
    <Text>{questionIndex + 1} / {length}</Text>
    <View style={styles.title}>
      <Text>{title}</Text>
      {status === 'question'
        ? (
          <TouchableOpacity onPress={onPressAnswer}>
            <Text>Answer</Text>
          </TouchableOpacity>
        )
        : !last
            ? (
              <TouchableOpacity onPress={onPressQuestion}>
                <Text>Question</Text>
              </TouchableOpacity>
            )
            : null
      }
    </View>

    <View style={styles.buttons}>
      {last && voted && (
        <View style={{ alignItems: 'center' }}>
          <Text>There are no more questions in deck. </Text>
          <Text>Yout score is: {score}</Text>
          <TouchableOpacity onPress={onPressGoBack}>
            <Text>Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressRestartQuiz}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      )}
      <CardButton
        text='Correct'
        status={status}
        onPress={onPressCorrect}
      />
      <CardButton
        text='Incorrect'
        status={status}
        onPress={onPressIncorrect}
      />
    </View>
    
  </View>
)

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

Card.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  length: PropTypes.number,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  last: PropTypes.bool,
  voted: PropTypes.bool,
  score: PropTypes.number,
  onPressCorrect: PropTypes.func.isRequired,
  onPressIncorrect: PropTypes.func.isRequired,
  onPressQuestion: PropTypes.func.isRequired,
  onPressAnswer: PropTypes.func.isRequired,
  onPressRestartQuiz: PropTypes.func.isRequired,
  onPressGoBack: PropTypes.func.isRequired,
}

export default Card;
