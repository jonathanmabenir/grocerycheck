import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { View , Text, StatusBar } from 'react-native';
import {Font, AppLoading} from 'expo';
import {withApollo, compose} from 'react-apollo';

import InputBox from './InputBox';
import TodoList from './TodoList';
import ScannerScreen from '../Barcode/ScannerScreen';
import WithItems from '../Subscription/WithItems';
import Employee from '../Subscription/Employee';


import GroceryContext from '../GroceryContext';
import GroceryItem from './GroceryItem'; 

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      loading: true,

      GroceryItems:[],
    };
  }

  setFilter = (type) => {
    this.setState({
      filter: type
    })
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf')
    });
    setTimeout(function () {
      this.setState({ loading: false });
    }.bind(this), 2000)
  }

  updateValue = (key, val) => {
    this.setState({[key]: val});
  }

  getTotalAmount(){ 
     
    let total = 0; 
    this.state.GroceryItems.map((item) => { 
      total = total +  item.price; 
    }) 
     return total; 
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />; 
    }
 
    return (
      <Container>
       <GroceryContext.Provider value={{state: this.state, updateValue: this.updateValue}}>      
          
            <ScannerScreen items={this.props.items} />  

            <Content contentContainerStyle={{ justifyContent: 'space-between' }} > 
            <View >
            <InputBox />
          </View>
            <View >   
              { this.state.GroceryItems.map((item, key)=>( 
                    <GroceryItem
                      data = {item} 
                      itemCount = {key}
                    /> 
                )
              )} 
              </View>    
            </Content>

            <View
          style={{
            padding: 5,
            marginVertical: 5,
            borderTopWidth: 0.5
          }}
        >
         <Text>Total Price: Php{this.getTotalAmount()}</Text>
          <Employee />
        </View>
 
        </GroceryContext.Provider> 

      </Container>
    );
  }
}

export default compose(
  withApollo,
  WithItems
)(Todo);
