import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const { question, answer } = values;
  const errors = {};

  if (!question){
    errors.question = 'Required'
  } else if (question.trim().length < 3) {
    errors.question = 'Question must have 3 characters at least.';
  }
  if (!answer){
    errors.answer = 'Required'
  } else if (answer.trim().length === 0) {
    errors.answer = 'Answer must have 1 character at least.';
  }

  return errors;
}

const renderField = ({
  input: { onChange, ...restInput },
  meta: {touched, error, warning }
}) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChange}
        {...restInput}
        />
      {touched &&
        (error && <Text style={styles.error}>{error}</Text>)}
    </View>
  )
}

let NewCardForm = ({ onSubmit, handleSubmit }) => {
  const submit = values => {
    onSubmit(values);
  }
  return (
    <View onSubmit='zkouska'>
      <Text>Question:</Text>
      <Field name='question' component={renderField} />
      <Text>Answer:</Text>
      <Field name='answer' component={renderField} />
      <TouchableOpacity onPress={handleSubmit(submit)}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  error: {
    color: 'red',
  },
})

NewCardForm = reduxForm({
  form: 'addNewCard',
  validate,
})(NewCardForm)

export default NewCardForm;