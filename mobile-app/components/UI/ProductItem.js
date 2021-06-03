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
      <View style={styles.title}>
        <Text>{props.title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="-" type="clear" />
        </View>
        <View style={styles.button}>
          <Text style={{ textAlign: 'center' }}>1</Text>
        </View>
        <View style={styles.button}>
          <Button title="+" type="clear" />
        </View>
      </View>
    </View>
    // <View>
    //   <Text>COMPONENTAAAAAAAAAAAa</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    width: '100%',
    maxHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 3,
  },
  imageContainer: {
    width: '12%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    marginHorizontal: 20,
  },

  buttonContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ff0000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
});

export default ProductItem;
