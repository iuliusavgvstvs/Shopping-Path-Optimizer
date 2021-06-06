import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CustomHeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { SearchBar, Button } from 'react-native-elements';
import ProductItem from '../components/UI/ProductItem';
import CategoryGridTile from '../components/UI/CategoryGridTile';
import SearchProductItem from '../components/UI/SearchProductItem';

const PRODUCTS = [
  {
    id: '1',
    title: 'Paine alba feliata',
    description: 'Paine alba din faina de grau.',
    price: '3',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/07/11/17/31/bread-1510155_1280.jpg',
    categoryId: '1',
  },
  {
    id: '2',
    title: 'Ulei',
    description: 'Ulei de masline. 1L',
    price: '25.5',
    imageUrl:
      'https://cdn.pixabay.com/photo/2019/04/06/19/22/glass-4108085_1280.jpg',
    categoryId: '1',
  },
  {
    id: '4',
    title: 'Zahar',
    description: 'Zahar alb cristal',
    price: '2.5',
    imageUrl:
      'https://cdn.pixabay.com/photo/2020/04/14/05/22/cube-5040933_1280.jpg',
    categoryId: '1',
  },
  {
    id: '5',
    title: 'Lapte',
    description: 'Lapte de vacaaaa',
    price: '4',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/12/06/18/27/milk-1887237_1280.jpg',
    categoryId: '3',
  },
  {
    id: '6',
    title: 'Apa',
    description: 'Apa de izvor',
    price: '2',
    imageUrl:
      'https://cdn.pixabay.com/photo/2017/02/02/15/15/bottle-2032980__480.jpg',
    categoryId: '2',
  },
  {
    id: '7',
    title: 'Cartofi',
    description: 'Cartofi albi 1kg',
    price: '2.8',
    imageUrl:
      'https://cdn.pixabay.com/photo/2014/08/06/20/32/potatoes-411975__340.jpg',
    categoryId: '5',
  },
  {
    id: '8',
    title: 'Cafea Jacobs',
    description: 'Cafea jacobs 500g',
    price: '2.8',
    imageUrl: 'https://cdn.alzashop.com/Foto/f9_rect/JA/JACKA001.jpg',
    categoryId: '4',
  },
];

const CATEGORIES = [
  {
    id: '1',
    title: 'Alimente de baza',
    imageUrl:
      'https://cdn.pixabay.com/photo/2017/10/18/16/44/bread-2864703_1280.jpg',
  },
  {
    id: '2',
    title: 'Bauturi & Apa',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/11/21/13/04/alcoholic-beverages-1845295__480.jpg',
  },
  {
    id: '3',
    title: 'Produse Lactate',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/12/06/18/27/milk-1887234_1280.jpg',
  },
  {
    id: '4',
    title: 'Cafea si ceai',
    imageUrl:
      'https://cdn.pixabay.com/photo/2013/11/05/23/55/coffee-206142__480.jpg',
  },
  {
    id: '5',
    title: 'Fructe si legume',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/10/22/15/35/fruits-1761031_1280.jpg',
  },
  {
    id: '6',
    title: 'Cosmetica si igiena',
    imageUrl:
      'https://cdn.pixabay.com/photo/2015/07/12/19/07/dental-842314__340.jpg',
  },
  {
    id: '7',
    title: 'Paste fainoase',
    imageUrl:
      'https://cdn.pixabay.com/photo/2010/12/13/10/00/pasta-2093__480.jpg',
  },
  {
    id: '8',
    title: 'Dulciuri',
    imageUrl:
      'https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543__340.jpg',
  },
  {
    id: '9',
    title: 'Conserve',
    imageUrl:
      'https://cdn.pixabay.com/photo/2012/03/04/00/56/cans-22150__480.jpg',
  },
  {
    id: '10',
    title: 'Mezeluri',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/04/20/12/49/sausage-1341091_1280.jpg',
  },
];
const ProductsScreen = (props) => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState(CATEGORIES);
  const [searchCategoryId, setSearchCategoryId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
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
    setSearchCategoryId(null);
    setSearchText(search);
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(search)
    );
    setFilteredProducts(filteredProducts);
  };

  const selectCategoryHandler = (id) => {
    setSearchCategoryId(id);
    const filteredProducts = products.filter(
      (product) => product.categoryId === id
    );
    setFilteredProducts(filteredProducts);
  };
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        onSelect={() => {
          selectCategoryHandler(itemData.item.id);
        }}
      />
    );
  };

  const InfoBar = () => {
    let categoryName = null;
    const productsNo = filteredProducts.length;
    if (searchCategoryId) {
      categoryName = categories.find(
        (cat) => cat.id === searchCategoryId
      ).title;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'space-between',
          paddingHorizontal: 5,
          backgroundColor: '#969696',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>
            {categoryName &&
              productsNo > 1 &&
              `Showing ${productsNo} products from ${categoryName}`}
            {categoryName &&
              productsNo === 1 &&
              `Showing 1 product from ${categoryName}`}
            {categoryName &&
              productsNo === 0 &&
              `No products found for this category`}
            {categoryName === null &&
              productsNo > 1 &&
              `Found ${productsNo} products`}
            {categoryName === null && productsNo === 1 && `Found 1 product`}
            {categoryName === null && productsNo === 0 && `No products found`}
          </Text>
        </View>
        <View
          style={{
            width: '20%',
          }}
        >
          <Button
            title="Go back"
            type="outline"
            onPress={() => setSearchCategoryId(null)}
          />
        </View>
      </View>
    );
  };

  const SearchResultList = () => {
    return (
      <>
        <InfoBar />
        <View style={{ flex: 7 }}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <SearchProductItem
                onPress={addHandler}
                title={itemData.item.title}
                description={itemData.item.description}
                price={itemData.item.price}
                imageUrl={itemData.item.imageUrl}
              />
            )}
          />
        </View>
      </>
    );
  };

  const addHandler = () => {
    console.log('product added');
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
        <View style={styles.searchResults}>
          {searchCategoryId === null && searchText === '' ? (
            <FlatList
              data={categories}
              renderItem={renderGridItem}
              numColumns={2}
            />
          ) : (
            <SearchResultList />
          )}
        </View>
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
          <FlatList
            style={{ flex: 1, width: '100%' }}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <ProductItem
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
                price={itemData.item.price}
              />
            )}
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
    width: '100%',
  },
  searchResults: {
    height: '85%',
    width: '100%',
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
});

export default ProductsScreen;
