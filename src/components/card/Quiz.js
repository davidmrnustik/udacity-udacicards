// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  setLocalNotification,
  clearLocalNotification,
} from '../../utils/helpers';
import type { CardType, NavigationType } from '../../utils/types';
import Card from './Card';

type PropsType = {
  questions: CardType,
  navigation: NavigationType,
}

type StateType = {
  questionIndex: number,
  status: string,
  score: ?number,
  voted: boolean,
}

/**
  * Quiz component contains functionality to question, answer and vote.
  * It also calculates users score.
  * It receives decks props and deckId that is parsed from navigation params.
  */
class Quiz extends PureComponent<PropsType, StateType> {
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

    return (
      <Card
        questionIndex={questionIndex}
        length={length}
        title={title}
        status={status}
        last={last}
        voted={voted}
        score={score}
        onPressCorrect={this.onPressCorrect}
        onPressIncorrect={this.onPressIncorrect}
        onPressQuestion={this.onPressQuestion}
        onPressAnswer={this.onPressAnswer}
        onPressRestartQuiz={this.onPressRestartQuiz}
        onPressGoBack={() => navigation.goBack()}
        voted={voted}
        score={score}
      />
    )
  }
}

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  return {
    questions: decks[deckId].questions,
  }
}

export default connect(mapStateToProps)(Quiz);
