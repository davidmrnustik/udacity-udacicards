import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

/**
  * Frontend validation functionality when adding a new card.
  * https://redux-form.com/7.2.0/examples/
  */
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

/**
  * renderField handles errors, warnings and renders 'form' fields
  * of types TextInput.
  * https://redux-form.com/7.2.0/examples/
  */
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

/**
  * NewCardForm handles form for create a new card
  * with question and answer.
  * It uses redux-form to handle form data and validate them.
  * https://redux-form.com/7.2.0/examples/
  */
let NewCardForm = ({ onSubmit, handleSubmit }) => {
  const submit = values => {
    onSubmit(values);
  }
  return (
    <View>
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

NewCardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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