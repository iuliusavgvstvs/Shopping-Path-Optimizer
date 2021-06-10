import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
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

const ProductsScreen = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchCategoryId, setSearchCategoryId] = useState(null);
  const [myTimeout, setMyTimeout] = useState();

  useEffect(() => {
    props.navigation.setOptions({
      title: 'Search Products',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'cart-outline' : 'ios-cart'}
            onPress={() => {
              props.navigation.navigate('Path');
            }}
          />
        </HeaderButtons>
      ),
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

  const categories = useSelector((state) => state.category.availableCategories);
  const products = useSelector((state) => state.products.availableProducts);
  const isLoadingCategories = useSelector((state) => state.category.isLoading);
  const isLoadingProducts = useSelector((state) => state.products.isLoading);
  const categoryError = useSelector((state) => state.category.error);
  const productsError = useSelector((state) => state.products.error);
  const token = useSelector((state) => state.auth.token);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.fetchCategories(token));
  }, [dispatch]);

  const clearCategoryError = async () => {
    await dispatch(categoryActions.clearError);
  };

  const clearProductError = async () => {
    await dispatch(productsActions.clearError);
  };

  useEffect(() => {
    if (categoryError) {
      Alert.alert('An Error Occured', categoryError, [
        {
          text: 'Okay',
          onPress: () => {
            clearCategoryError;
          },
        },
      ]);
    }
    if (productsError) {
      Alert.alert('An Error Occured', productsError, [
        {
          text: 'Okay',
          onPress: () => {
            clearProductError;
          },
        },
      ]);
    }
  }, [categoryError, productsError]);

  const updateSearch = (search) => {
    setSearchCategoryId(null);
    setSearchText(search);
    clearTimeout(myTimeout);
    setMyTimeout(
      setTimeout(
        () => dispatch(productsActions.fetchProductsByName(token, search)),
        500
      )
    );
  };

  const selectCategoryHandler = (id) => {
    setSearchCategoryId(id);
    dispatch(productsActions.fetchProductsByCatId(token, id));
  };

  const addHandler = (id, title, imageUrl, price) => {
    dispatch(cartActions.addToCart({ id, price, title, imageUrl }));
  };
  const removeHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };
  const renderGridItem = (itemData) => {
    if (isLoadingCategories) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
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
    let productsNo = 0;
    if (products) {
      productsNo = products.length;
    }
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
        {searchText === '' && (
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
        )}
      </View>
    );
  };

  const SearchResultList = () => {
    if (isLoadingProducts) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
    return (
      <>
        <InfoBar />
        <View style={{ flex: 7 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <SearchProductItem
                onPress={() =>
                  addHandler(
                    itemData.item.id,
                    itemData.item.title,
                    itemData.item.imageUrl,
                    itemData.item.price
                  )
                }
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

  const ShoppingList = () => {
    const items2 = Object.values(items).reverse();
    return Object.values(items).length > 0 ? (
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
            addHandler={() =>
              addHandler(
                itemData.item.productId,
                itemData.item.productTitle,
                itemData.item.productImageUrl,
                itemData.item.productPrice
              )
            }
            removeHandler={() => removeHandler(itemData.item.productId)}
          />
        )}
      />
    ) : (
      <Text style={{ textAlign: 'center', color: '#fff' }}>
        No products added yet. Start by adding products from the list above.
      </Text>
    );
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsScreen;
