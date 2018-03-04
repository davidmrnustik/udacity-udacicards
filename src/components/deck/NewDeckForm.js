import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const validate = (values, { decks }) => {
  const { title } = values;
  const errors = {};

  if (!title){
    errors.title = 'Required'
  } else if (title.trim().length < 3) {
    errors.title = 'Title must have 3 characters at least.';
  } else {
    Object.keys(decks).map(deck => {
      if (deck === title.trim()) errors.title = 'Title is already assigned.';
    })
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

let NewDeckForm = ({ onSubmit, handleSubmit }) => {
  const submit = values => {
    onSubmit(values);
  }
  return (
    <View>
      <Text>Title:</Text>
      <Field name='title' component={renderField} />
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

NewDeckForm = reduxForm({
  form: 'addDeckCard',
  validate,
})(NewDeckForm)
NewDeckForm = connect(({ decks }) => ({ decks }))(NewDeckForm);

export default NewDeckForm;