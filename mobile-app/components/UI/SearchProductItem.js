import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';

const SearchProductItem = (props) => {
  return (
    <ListItem bottomDivider>
      <Avatar source={{ uri: props.imageUrl }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: 'open-sans-bold', fontSize: 14 }}>
          {props.title}
        </ListItem.Title>
        <ListItem.Subtitle style={{ fontFamily: 'open-sans', fontSize: 12 }}>
          {props.description}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View style={styles.buttonContainer}>
        <Text style={styles.price}>{props.price}$</Text>
        <ListItem.Chevron
          onPress={props.onPress}
          size={28}
          color={Colors.primary}
          name="add-circle"
        />
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginRight: 10,
  },
});

export default SearchProductItem;
