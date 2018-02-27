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
    const { deckId } = navigation.state.params;

    return {
      title: 'Quiz',
    }
  }
  state = {
    questionIndex: 0,
    questionAnswer: 'question',
  }
  render() {
    const { navigation, questions } = this.props;
    const { questionIndex } = this.state;

    return (
      <View style={styles.container}>
        <Text>{questionIndex + 1} / {questions.length}</Text>
        <View style={styles.title}>
          <Text>{questions[questionIndex].question}</Text>
          <TouchableOpacity>
            <Text>Answer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Incorrect</Text>
          </TouchableOpacity>
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
  const deck = Object.keys(decks).filter(deck => decks[deck].title === ownProps.navigation.state.params.deckId)[0];
  return {
    questions: decks[deck].questions,
  }
}

export default connect(mapStateToProps)(Quiz);
