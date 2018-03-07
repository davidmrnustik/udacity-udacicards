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
import { commonColor, commonStyle } from '../../utils/variables';

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
    <Text style={styles.pager}>{questionIndex + 1} / {length}</Text>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      {status === 'question'
        ? (
          <TouchableOpacity onPress={onPressAnswer}>
            <Text style={commonStyle.link}>Answer</Text>
          </TouchableOpacity>
        )
        : !last
            ? (
              <TouchableOpacity onPress={onPressQuestion}>
                <Text style={commonStyle.link}>Question</Text>
              </TouchableOpacity>
            )
            : <Text>There are no more questions in deck.</Text>
      }
    </View>

    <View style={styles.buttons}>
      {last && voted
        ? (
            <View style={styles.finalScore}>
              <Text style={styles.score}>Your score is: {score}</Text>
              <View style={styles.finalButtons}>
                <TouchableOpacity
                  onPress={onPressGoBack}
                  style={[commonStyle.buttonInverse, styles.button]}
                >
                  <Text style={commonStyle.buttonTextInverse}>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressRestartQuiz}
                  style={[commonStyle.buttonInverse, styles.button]}  
                >
                <Text style={commonStyle.buttonTextInverse}>Restart Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        : (
            <View>
              <CardButton
                text='Correct'
                status={status}
                onPress={onPressCorrect}
                styleButton={[commonStyle.buttonSuccess, styles.buttonCorrect]}
                styleButtonText={commonStyle.buttonText}
              />
              <CardButton
                text='Incorrect'
                status={status}
                onPress={onPressIncorrect}
                styleButton={commonStyle.buttonWarning}
                styleButtonText={commonStyle.buttonText}
              />
            </View>
          )
        }
    </View>
    
  </View>
)

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
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  pager: {
    textAlign: 'center',
    marginTop: 10,
    color: commonColor.brown
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCorrect: {
    marginBottom: 20
  },
  score: {
    marginVertical: 20,
    fontSize: 20,
    color: commonColor.turquoise,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  finalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    marginHorizontal: 10
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
