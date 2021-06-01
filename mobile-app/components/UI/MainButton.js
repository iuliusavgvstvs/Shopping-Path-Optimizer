import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';

const MainButton = (props) => {
  if (props.linearGradient) {
    return (
      <TouchableOpacity
        onPress={props.onClick}
        style={props.style || styles.button}
      >
        <LinearGradient
          colors={props.colors || [Colors.half_primary, Colors.primary]}
          style={props.style || styles.button}
        >
          <Text style={props.textStyle || styles.text}>{props.text} </Text>
          {props.children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={props.style || styles.button}
    >
      <Text style={props.textStyle || styles.text}>{props.text}</Text>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainButton;
