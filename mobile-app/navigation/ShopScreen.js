import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

const stackScreen = createStackNavigator();

const ShopScreen = ({ navigation }) => (
  <stackScreen.Navigator headerMode="none">
    <stackScreen.Screen name="HomeScreen" component={HomeScreen} />
  </stackScreen.Navigator>
);

export default ShopScreen;
