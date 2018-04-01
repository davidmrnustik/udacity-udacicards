// @flow

import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { commonStyle } from '../../utils/variables';
import type { QuestionType, DecksType } from '../../utils/types';

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
        style={[commonStyle.textInput, styles.textInput]}
        onChangeText={onChange}
        {...restInput}
        />
      {touched &&
        (error && <Text style={commonStyle.error}>{error}</Text>)}
    </View>
  )
}

type PropsType = {
  onSubmit: (values: QuestionType) => void,
} & FormProps

/**
  * NewCardForm handles form for create a new card
  * with question and answer.
  * It uses redux-form to handle form data and validate them.
  * https://redux-form.com/7.2.0/examples/
  */
let NewCardForm = ({ onSubmit, handleSubmit }: PropsType) => {
  const submit = values => {
    onSubmit(values);
  }
  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.label}>Question:</Text>
        <Field name='question' component={renderField} />
      </View>
      <View>
        <Text style={styles.label}>Answer:</Text>
        <Field name='answer' component={renderField} />
      </View>
      <TouchableOpacity
        onPress={handleSubmit(submit)}
        style={[commonStyle.button, styles.button]}
      >
        <Text style={[commonStyle.buttonText, styles.buttonText]}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center'
  },
  textInput: {
    alignSelf: 'center',
    width: '80%',
  },
  label: {
    textAlign: 'center',
    marginBottom: 5,
  },
  question: {
    marginBottom: 20,
  }
})

NewCardForm = reduxForm({
  form: 'addNewCard',
  validate,
})(NewCardForm)

export default NewCardForm;