import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  setLocalNotification,
  clearLocalNotification,
} from '../../utils/helpers';

/**
  * Quiz component contains functionality modify, remove and vote.
  * It receives decks props and deckId that is parsed from navigation params.
  */
class Quiz extends PureComponent {
  static navigationOptions = {
    title: 'Quiz',
  }
  state = {
    questionIndex: 0,
    status: 'question',
    score: 0,
    voted: false,
  }
  onPressCorrect = () => {
    if (this.state.voted) return Alert.alert('You have already voted!');
    this.setState(state => ({
      score: state.score + 1,
      voted: true,
    }))
  }
  onPressIncorrect = () => {
    if (this.state.voted) return Alert.alert('You have already voted!');
    this.setState({ voted: true });
  }
  setNotifications() {
    clearLocalNotification()
      .then(setLocalNotification)
  }
  onPressAnswer = () => {
    const last = this.props.questions.length - 1;
    if (this.state.questionIndex === last) {
      this.setNotifications();
    };
    this.setState(state => ({
      status: 'answer',
    }));
  }
  onPressQuestion = () => {
    if (!this.state.voted) return Alert.alert('You have to vote!');
    const length = this.props.questions.length - 1;
    this.setState(state => ({
      status: 'question',
      voted: false,
      questionIndex: state.questionIndex < length
        ? state.questionIndex + 1
        : state.questionIndex
    }));
  }
  onPressRestartQuiz = () => {
    const { navigation } = this.props;
    const { deckId } = navigation.state.params;
    navigation.dispatch(NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { deckId }
        }),
        NavigationActions.navigate({
          routeName: 'Quiz',
          params: { deckId }
        }),
      ]
    }))
  }
  render() {
    const { navigation, questions } = this.props;
    const { questionIndex, status, score, voted } = this.state;
    const length = questions.length;
    const title = questions[questionIndex][status];
    const last = questionIndex === length - 1;
    const buttons = (onPress, text) => (
      <TouchableOpacity
        onPress={status === 'question'
          ? () => Alert.alert('You have to answer first.')
          : onPress}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <Text>{questionIndex + 1} / {length}</Text>
        <View style={styles.title}>
          <Text>{title}</Text>
          {status === 'question'
            ? (
              <TouchableOpacity onPress={this.onPressAnswer}>
                <Text>Answer</Text>
              </TouchableOpacity>
            )
            : !last
                ? (
                  <TouchableOpacity onPress={this.onPressQuestion}>
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Back to Deck</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressRestartQuiz()}>
                <Text>Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          )}
          {buttons(this.onPressCorrect, 'Correct')}
          {buttons(this.onPressIncorrect, 'Incorrect')}
        </View>
        
      </View>
    )
  }
}

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

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  return {
    questions: decks[deckId].questions,
  }
}

export default connect(mapStateToProps)(Quiz);
