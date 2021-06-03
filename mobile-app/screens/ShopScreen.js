import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import ProductsScreen from './ProductsScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const homeStackScreen = createStackNavigator();
const productsStackScreen = createStackNavigator();
const drawerNavigator = createDrawerNavigator();

const defaultScreenConfig = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

const HomeStackNavigator = ({ navigation }) => (
  <homeStackScreen.Navigator mode="modal" headerMode="float">
    <homeStackScreen.Screen
      name="Home"
      component={HomeScreen}
      options={defaultScreenConfig}
    />
  </homeStackScreen.Navigator>
);

const ProductsStackNavigator = ({ navigation }) => (
  <productsStackScreen.Navigator mode="modal" headerMode="float">
    <productsStackScreen.Screen
      name="Products"
      component={ProductsScreen}
      options={defaultScreenConfig}
    />
  </productsStackScreen.Navigator>
);

const DrawerNavigator = () => {
  return (
    <drawerNavigator.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <drawerNavigator.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={
                Platform.OS === 'android' ? 'home-outline' : 'ios-home-outline'
              }
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <drawerNavigator.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={
                Platform.OS === 'android'
                  ? 'search-outline'
                  : 'ios-search-outline'
              }
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
    </drawerNavigator.Navigator>
  );
};

export default DrawerNavigator;
