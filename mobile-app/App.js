import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './store/reducers/authReducer';
import productReducer from './store/reducers/productReducer';
import cartReducer from './store/reducers/cartReducer';
import pathReducer from './store/reducers/pathReducer';
//import orderReducer from './store/reducers/orderReducer';
import categoryReducer from './store/reducers/categoryReducer';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';

const rootStore = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  //order: orderReducer,
  category: categoryReducer,
  path: pathReducer,
});

const store = createStore(rootStore, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
