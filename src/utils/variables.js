export const commonColor = {
  buttonUnderlayColor: '#e0d6c1',
  brown: '#968d72',
  brownLight: '#c5b69c',
  brownVeryLight: '#e2d6c1',
  turquoise: '#3cbde3',
  grey: '#fefefe',
  white: '#fff',
  backgroundColor: '#f5f1e8',
  green: '#28a745',
  red: '#dc3545'
}

const buttonStyle = {
  paddingVertical: 16,
  paddingHorizontal: 12,
  borderRadius: 5,
  minWidth: 120,
}

export const commonStyle = {
  button: {
    ...buttonStyle,
    backgroundColor: commonColor.brownLight,
  },
  buttonInverse: {
    ...buttonStyle,
    borderColor: commonColor.brownLight,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: commonColor.white
  },
  buttonSuccess: {
    ...buttonStyle,
    backgroundColor: commonColor.green,
  },
  buttonWarning: {
    ...buttonStyle,
    backgroundColor: commonColor.red,
  },
  buttonTextInverse: {
    color: commonColor.brown,
    textAlign: 'center',
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    minHeight: 40,
    width: 250,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderColor: commonColor.brownLight
  },
  error: {
    marginTop: 5,
    color: 'red',
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    color: commonColor.brown,
    fontSize: 15,
  }
}