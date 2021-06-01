import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const stackScreen = createStackNavigator();

const RootScreen = ({ navigation }) => (
  <stackScreen.Navigator headerMode="none">
    <stackScreen.Screen name="SplashScreen" component={SplashScreen} />
    <stackScreen.Screen name="LoginScreen" component={LoginScreen} />
    <stackScreen.Screen name="SignupScreen" component={SignUpScreen} />
  </stackScreen.Navigator>
);

export default RootScreen;
