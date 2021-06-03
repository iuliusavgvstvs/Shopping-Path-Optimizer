import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import MainButton from '../components/UI/MainButton';

const buttonText = 'Get Started ';

const SplashScreen = ({ navigation }) => {
  const buttonHandler = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Shopping made faster and easier!</Text>
        <Text style={styles.text}>
          Sign in with an existing account or create one now.
        </Text>
        <View style={styles.buttonContainer}>
          <MainButton onClick={buttonHandler} linearGradient>
            {buttonText}
            <Ionicons name="navigate-outline" size={20} color="#fff" />
          </MainButton>
        </View>
      </Animatable.View>
    </View>
  );
};

const height = Dimensions.get('window').width;
const logo_height = height * 0.8;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: logo_height,
    height: logo_height,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'gray',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 50,
  },
});

export default SplashScreen;
