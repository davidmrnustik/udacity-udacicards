import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class Quiz extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz',
    }
  }
  state = {
    questionIndex: 0,
    status: 'question',
    score: 0,
    voted: false,
  }
  onPressCorrect = () => {
    if (this.state.voted) return alert('You have already voted!');
    this.setState(state => ({
      score: state.score + 1,
      voted: true,
    }))
  }
  onPressIncorrect = () => {
    if (this.state.voted) return alert('You have already voted!');
    this.setState({ voted: true });
  }
  onPressAnswer = () => {
    this.setState(state => ({
      status: 'answer',
    }));
  }
  onPressQuestion = () => {
    if (!this.state.voted) return alert('You have to vote!');
    const length = this.props.questions.length - 1;
    this.setState(state => ({
      status: 'question',
      voted: false,
      questionIndex: state.questionIndex < length
        ? state.questionIndex + 1
        : state.questionIndex
    }));
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
          ? () => alert('You have to answer first.')
          : onPress}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <Text>{questionIndex + 1} / {length}</Text>
        <Text>Score: {score}</Text>
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
                <Text>Go back</Text>
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

function mapStateToProps({ decks }, ownProps) {
  const deck = Object.keys(decks)
    .filter(deck => decks[deck].title === ownProps.navigation.state.params.deckId)[0];
  return {
    questions: decks[deck].questions,
  }
}

export default connect(mapStateToProps)(Quiz);
