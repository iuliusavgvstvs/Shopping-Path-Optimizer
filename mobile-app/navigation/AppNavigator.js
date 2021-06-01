import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RootScreen from './RootScreen';
import ShopScreen from './ShopScreen';

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  console.log('>>>>>>>>>>>>>>>>>>>>IS LOGIN AICI', isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? <ShopScreen /> : <RootScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
