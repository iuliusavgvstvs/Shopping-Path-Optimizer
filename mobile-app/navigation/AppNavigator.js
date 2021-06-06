import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RootScreen from '../screens/RootScreen';
import DrawerNavigator from '../screens/ShopScreen';

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <RootScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
