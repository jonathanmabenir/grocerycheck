import React from 'react';
import { Text, ListItem, Body, View, Icon } from 'native-base';

import {compose} from 'react-apollo';  
import withContext from "../Subscription/WithContext";  
 

const GroceryItem = ({context, data, itemCount}) => {
 
  const deleteItem = ({data}) => {
  
      let currItems = context.state.GroceryItems; 
      // console.log("currItems"); 
      // console.log(currItems); 
         
      let filteredArray = currItems.filter(item => {  
          return item.itemId !== data.itemId}
        )
 
       context.updateValue( 'GroceryItems', filteredArray); 
    }
     
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
          onPress={ ()=> deleteItem({data})} 
        /> 

    </ListItem>
    {/* <Toast visible={true} message={`Saving...`} /> */}
  </View>
)};
 
export default compose( 
  withContext
)(GroceryItem);
