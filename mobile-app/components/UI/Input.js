import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { validate } from '../utils/validators';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: false,
    touched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (text) => {
    dispatch({
      type: INPUT_CHANGE,
      val: text,
      validators: props.validators,
    });
  };
  const touchHandler = () => {
    dispatch({
      type: INPUT_BLUR,
    });
  };

  return (
    <>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={
          !inputState.isValid && inputState.touched
            ? [props.style, styles.textContainerInvalid]
            : [props.style, styles.textContainer]
        }
      >
        {props.icon1}
        <TextInput
          {...props}
          style={styles.input}
          value={inputState.value}
          onChangeText={changeHandler}
          onBlur={touchHandler}
          placeholder={props.placeholder}
        />
        {props.icon2}
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans',
    color: '#091d4d',
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#091d4d',
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textContainerInvalid: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0000',
    paddingBottom: 5,
  },
});

export default Input;
