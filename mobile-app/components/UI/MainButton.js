import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';

const MainButton = (props) => {
  if (props.linearGradient) {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onClick}
        style={props.style || styles.button}
      >
        <LinearGradient
          colors={props.colors || [Colors.half_primary, Colors.primary]}
          style={props.style || styles.button}
        >
          <Text style={props.textStyle || styles.text}>{props.children} </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onClick}
      style={props.style || styles.button}
    >
      <Text style={props.textStyle || styles.text}>{props.children}</Text>
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
