import React from 'react';
import { Text, ListItem, Body, View, Icon } from 'native-base';
import DeleteButton from './DeleteButton';

const deleteItem = () => {
    // if (loading) return;
    // deleteTodo();
  }

const GroceryItem = ({ data, itemCount }) => {
  return (
  <View> 
    <ListItem style={{ flex: 1 }}>

        <Body>
        <Text style={{ alignSelf: 'center' }}>
          {itemCount+1}
        </Text>
        </Body>
      
      <Body>
        <Text style={{ alignSelf: 'center' }}>
          {data.name}
        </Text>
        </Body>

        <Body>
        <Text style={{ alignSelf: 'center' }}>
          {data.price}
        </Text>
      </Body>
     
      <Icon
            name="md-trash"
            style={{ color: '#EE001C' }}
            onPress={deleteItem} 
          /> 

    </ListItem>
    {/* <Toast visible={true} message={`Saving...`} /> */}
  </View>
)};

export default GroceryItem;
