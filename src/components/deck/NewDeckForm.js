import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { commonStyle } from '../../utils/variables';

/**
  * Frontend validation functionality when adding a new deck.
  * It also validates if deck exists in store.
  * https://redux-form.com/7.2.0/examples/
  */
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

/**
  * NewDeckForm handles form for create a new deck.
  * It uses redux-form to handle form data and validate them.
  * https://redux-form.com/7.2.0/examples/
  */
let NewDeckForm = ({ onSubmit, handleSubmit }) => {
  const submit = values => {
    onSubmit(values);
  }
  return (
    <View style={styles.container}>
      <Field name='title' component={renderField} />
      <TouchableOpacity
        onPress={handleSubmit(submit)}
        style={[commonStyle.button, styles.button]}  
      >
        <Text style={[commonStyle.buttonText, commonStyle.buttonText]}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

NewDeckForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const styles = {
  container: {
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center'
  },
  textInput: {
    alignSelf: 'center'
  }
}

NewDeckForm = reduxForm({
  form: 'addDeckCard',
  validate,
})(NewDeckForm)
NewDeckForm = connect(({ decks }) => ({ decks }))(NewDeckForm);

export default NewDeckForm;