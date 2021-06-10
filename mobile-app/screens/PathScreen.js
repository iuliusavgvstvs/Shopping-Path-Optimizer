import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  SectionList,
  ScrollView,
} from 'react-native';
import CustomHeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { SearchBar, Button } from 'react-native-elements';
import ProductItem from '../components/UI/ProductItem';
import CategoryGridTile from '../components/UI/CategoryGridTile';
import SearchProductItem from '../components/UI/SearchProductItem';
import { useSelector, useDispatch } from 'react-redux';
import * as categoryActions from '../store/actions/categoryActions';
import * as productsActions from '../store/actions/productActions';
import * as cartActions from '../store/actions/cartActions';
import { FlatGrid } from 'react-native-super-grid';

const PathScreen = (props) => {
  const [noItems, setNoItems] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => state.cart.items);
  const [map, setmap] = useState([
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' },
    { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' },
    { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' },
    { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' },
    { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' },
    { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' },
    { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' },
    { name: 'ASBESTOS', code: '#7f8c8d' },
  ]);

  const dispatch = useDispatch();

  const ShoppingList = () => {
    const items2 = Object.values(items).reverse();
    return (
      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={items2}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.productTitle}
            imageUrl={itemData.item.productImageUrl}
            quantity={itemData.item.quantity}
            price={itemData.item.sum}
          />
        )}
      />
    );
  };

  const RenderMap = () => {
    const matr = [
      [
        {
          id: '1',
          type: 'raft-horizontally',
          dimX: 1,
          dimY: 1,
          name: 'mezeluri',
        },
        { id: '2', type: 'wall-horizontally', dimX: 5, dimY: 1 },
        {
          id: '3',
          type: 'raft-horizontally',
          dimX: 1.5,
          dimY: 1,
          name: 'legume',
        },
        {
          id: '4',
          type: 'raft-horizontally',
          dimX: 5,
          dimY: 4,
          name: 'fructe',
        },
      ],
      [
        {
          id: '5',
          type: 'raft-horizontally',
          dimX: 1,
          dimY: 1,
          name: 'dulciuri',
        },
        { id: '6', type: 'wall-horizontally', dimX: 5, dimY: 1 },
        {
          id: '7',
          type: 'cafea',
          dimX: 1.5,
          dimY: 1,
          name: 'legume',
        },
        {
          id: '8',
          type: 'raft-horizontally',
          dimX: 5,
          dimY: 4,
          name: 'alimente de baza',
        },
      ],
    ];

    const mat = [
      [
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
      ],
      [
        'x',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        '+',
        '+',
        '-',
        'x',
      ],
      [
        'x',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        'x',
      ],
      [
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
        'x',
      ],
    ];
    return (
      <ScrollView
        contentContainerStyle={{
          height: 1000,
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ height: 1000, flexDirection: 'column' }}
        >
          {mat.map((obj) => {
            return (
              <View style={{ flexDirection: 'row' }}>
                {obj.map((cobj) => {
                  // if (cobj === 'x')
                  //   return (
                  //     <View
                  //       style={{
                  //         width: 20,
                  //         height: 20,
                  //         backgroundColor: 'black',
                  //       }}
                  //     ></View>
                  //   );
                  if (cobj === '-')
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'white',
                        }}
                      ></View>
                    );
                  if (cobj === '+')
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'green',
                        }}
                      ></View>
                    );
                })}
              </View>
            );
          })}
          {/* {matr.map((obj) => {
            if (obj.type === 'wall-horizontally')
              return (
                <View
                  style={{
                    width: 100 * obj.dimX,
                    height: 20 * obj.dimY,
                    borderWidth: 1,
                    backgroundColor: 'black',
                    borderColor: 'black',
                  }}
                >
                  <Text>{obj.name}</Text>
                </View>
              );
          })} */}
        </ScrollView>
      </ScrollView>
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <RenderMap />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTitleContainer}>
          <View style={styles.footerTitleElement}>
            <Text style={styles.footerTitleText}>
              Items in cart: {noItems}/{Object.values(items).length}
            </Text>
          </View>
          <View>
            <Text style={styles.footerTitleText}>
              Total Amount: {cartAmount.toFixed(2)}$
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
