import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Bine ai venit pe pagina de products.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default ProductsScreen;
