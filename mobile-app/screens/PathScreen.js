import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';
import ProductItem from '../components/UI/ProductItem';
import { useSelector, useDispatch } from 'react-redux';

import * as pathActions from '../store/actions/pathActions';

const PathScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.path.items);
  const itemsToPick = useSelector((state) => state.path.itemsToPick);
  const isLoadingPath = useSelector((state) => state.path.isLoadingPath);
  const path = useSelector((state) => state.path.path);
  const totalAmount = useSelector((state) => state.path.totalAmount);
  const itemsInCart = useSelector((state) => state.path.itemsInCart);
  const currentShelf = useSelector((state) => state.path.currentShelf);
  const currentShelves = useSelector((state) => state.path.currentShelves);
  const orderedShelves = useSelector((state) => state.path.orderedShelves);
  const allShelves = useSelector((state) => state.path.allShelves);
  const config = useSelector((state) => state.path.config);
  const dispatch = useDispatch();
  const [stop, setStop] = useState(false);

  const checkHandler = (productId) => {
    if (currentShelf < currentShelves.length - 1) {
      if (itemsToPick.length > 1) dispatch(pathActions.checkItem(productId));
      else if (itemsToPick.length === 1) {
        dispatch(pathActions.checkItem(productId));
        dispatch(
          pathActions.generateNext(
            token,
            allShelves,
            config.dimX,
            config.dimY,
            currentShelves[orderedShelves[currentShelf]].coordX,
            currentShelves[orderedShelves[currentShelf]].coordY,
            currentShelves[orderedShelves[currentShelf + 1]].coordX,
            currentShelves[orderedShelves[currentShelf + 1]].coordY
          )
        );
      }
    }
    if (currentShelf === currentShelves.length - 1) {
      if (itemsToPick.length > 1) dispatch(pathActions.checkItem(productId));
      else if (itemsToPick.length === 1) {
        dispatch(pathActions.checkItem(productId));
        dispatch(
          pathActions.generateNext(
            token,
            allShelves,
            config.dimX,
            config.dimY,
            currentShelves[orderedShelves[currentShelf]].coordX,
            currentShelves[orderedShelves[currentShelf]].coordY,
            config.endX,
            config.endY
          )
        );
        setStop(true);
      }
    }
  };

  const ShoppingList = () => {
    if (itemsToPick.length > 0 && !stop) {
      return (
        <FlatList
          style={{ flex: 1, width: '100%' }}
          data={itemsToPick}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <ProductItem
              title={itemData.item.productTitle}
              imageUrl={itemData.item.productImageUrl}
              quantity={itemData.item.quantity}
              price={itemData.item.sum}
              checkout="true"
              checkHandler={() => {
                checkHandler(itemData.item.productId);
              }}
            />
          )}
        />
      );
    } else if (stop) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Button
            title="Finish"
            onPress={() => {
              Alert.alert('Congratulations!', 'You finished.', [
                { text: 'Ok' },
              ]);
              props.navigation.navigate('Products');
            }}
          />
        </View>
      );
    }
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  };

  if (isLoadingPath) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const RenderMap = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          height: 1000,
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ height: 1000, flexDirection: 'column' }}
          key={Math.random().toString()}
        >
          {path.map((obj) => {
            return (
              <View
                style={{ flexDirection: 'row' }}
                key={Math.random().toString()}
              >
                {obj.map((cobj) => {
                  if (cobj === 0)
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'gray',
                        }}
                        key={Math.random().toString()}
                      ></View>
                    );
                  else if (cobj === 1)
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'white',
                        }}
                        key={Math.random().toString()}
                      ></View>
                    );
                  else if (cobj === '-')
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        key={Math.random().toString()}
                      >
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor: 'green',
                          }}
                          key={Math.random().toString()}
                        ></View>
                      </View>
                    );
                  else if (cobj === 'start')
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'green',
                        }}
                        key={Math.random().toString()}
                      >
                        <Text
                          style={{
                            fontSize: 30,
                            color: 'blue',
                            textAlign: 'center',
                          }}
                        >
                          O
                        </Text>
                      </View>
                    );
                  else if (cobj === 'stop')
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'green',
                        }}
                        key={Math.random().toString()}
                      >
                        <Text
                          style={{
                            fontSize: 30,
                            color: 'red',
                            textAlign: 'center',
                          }}
                        >
                          X
                        </Text>
                      </View>
                    );
                  else {
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'gray',
                        }}
                        key={Math.random().toString()}
                      >
                        <Text style={{ fontSize: 12 }}>{cobj}</Text>
                      </View>
                    );
                  }
                })}
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    );
  };
  let len = 0;
  if (items) {
    len = Object.values(items).length;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>{<RenderMap />}</View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTitleContainer}>
          <View style={styles.footerTitleElement}>
            <Text style={styles.footerTitleText}>
              Items in cart: {itemsInCart}/{len}
            </Text>
          </View>
          <View>
            <Text style={styles.footerTitleText}>
              Total Amount: {totalAmount.toFixed(2)}$
            </Text>
          </View>
        </View>
        <View style={styles.footerList}>
          <ShoppingList />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  footer: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  footerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  footerList: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    //borderColor: '#fff',
    //borderWidth: 2,
  },
  footerTitleText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: '#fff',
  },
  footerTitleElement: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 130,
    //width: 180,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default PathScreen;
