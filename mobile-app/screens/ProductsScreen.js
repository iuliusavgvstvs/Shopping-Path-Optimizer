import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import CustomHeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { SearchBar, Button } from 'react-native-elements';
import ProductItem from '../components/UI/ProductItem';

const products = [
  {
    id: '1',
    title: 'Paine alba feliata cu cartofi si seminte',
    description: 'Paine alba din faina de grau.',
    price: '3',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/07/11/17/31/bread-1510155_1280.jpg',
  },
  {
    id: '2',
    title: 'Ulei',
    description: 'Ulei de masline. 1L',
    price: '25.5',
    imageUrl:
      'https://cdn.pixabay.com/photo/2019/04/06/19/22/glass-4108085_1280.jpg',
  },
  {
    id: '4',
    title: 'Zahar',
    description: 'Zahar alb cristal',
    price: '2.5',
    imageUrl:
      'https://cdn.pixabay.com/photo/2020/04/14/05/22/cube-5040933_1280.jpg',
  },
  {
    id: '5',
    title: 'Lapte',
    description: 'Lapte de vacaaaa',
    price: '4',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/12/06/18/27/milk-1887237_1280.jpg',
  },
  {
    id: '6',
    title: 'Apa',
    description: 'Apa de izvor',
    price: '2',
    imageUrl:
      'https://cdn.pixabay.com/photo/2017/02/02/15/15/bottle-2032980__480.jpg',
  },
  {
    id: '7',
    title: 'Cartofi',
    description: 'Cartofi albi 1kg',
    price: '2.8',
    imageUrl:
      'https://cdn.pixabay.com/photo/2014/08/06/20/32/potatoes-411975__340.jpg',
  },
];
const ProductsScreen = (props) => {
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Search Products',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);
  const updateSearch = (search) => {
    setSearchText(search);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchBar
            round={true}
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={searchText}
            lightTheme={true}
          />
        </View>
        <View style={styles.searchResult}></View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTitleContainer}>
          <View style={styles.footerTitleElement}>
            <Text style={styles.footerTitleText}>Products List:</Text>
          </View>
          <View>
            <Text style={styles.footerTitleText}>Total Price: 123$</Text>
          </View>
        </View>
        <View style={styles.footerList}>
          {/* <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
              <ListItem
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
              />;
            }}
          /> */}
          {products.map((product) => {
            <ProductItem title={product.title} imageUrl={product.imageUrl} />;
            console.log(product);
          })}
          <ProductItem
            title={products[0].title}
            imageUrl={products[0].imageUrl}
          />
          <ProductItem
            title={products[1].title}
            imageUrl={products[1].imageUrl}
          />
          <ProductItem
            title={products[2].title}
            imageUrl={products[2].imageUrl}
          />
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    width: '100%',
  },
  footer: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  footerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    //alignItems: 'flex-start',
  },
  footerList: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderColor: '#fff',
    borderWidth: 2,
  },
  footerTitleText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: '#fff',
  },
  footerTitleElement: {
    flex: 1,
  },
});

export default ProductsScreen;
