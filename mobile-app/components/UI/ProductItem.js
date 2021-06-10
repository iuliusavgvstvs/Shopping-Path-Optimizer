import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';

const ProductItem = (props) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: props.imageUrl,
          }}
        ></Image>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{props.price}$</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="-" type="clear" onPress={props.removeHandler} />
        </View>
        <View style={styles.button}>
          <Text style={styles.quantity}>{props.quantity}</Text>
        </View>
        <View style={styles.button}>
          <Button title="+" type="clear" onPress={props.addHandler} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    width: '100%',
    maxHeight: 45,
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 3,
  },
  imageContainer: {
    flex: 2,
    maxWidth: '12%',
    height: '100%',
    //borderColor: '#ff0000',
    //borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  titleContainer: {
    //borderColor: '#000000',
    //borderWidth: 1,
    flex: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: 'open-sans-bold',
    color: '#fff',
    textAlign: 'left',
    marginLeft: 10,
  },
  priceContainer: {
    flex: 1,
    //borderWidth: 1,
    // borderColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
  },
  price: {
    alignItems: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 13,
    color: '#fff',
  },
  buttonContainer: {
    flex: 3,
    // borderWidth: 1,
    // borderColor: '#ff0000',
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: '10%',
    maxWidth: '20%',
  },
  button: {
    flex: 1,
  },
  quantity: { textAlign: 'center', color: '#fff' },
});

export default ProductItem;
