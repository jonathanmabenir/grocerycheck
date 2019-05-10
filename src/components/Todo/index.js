import React, { Component } from 'react';
import { Container, Content, Button  } from 'native-base';
import { View , Text, Alert } from 'react-native';
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
  componentDidMount() {
    setTimeout(function () {
      this.setState({ loading: false });
    }.bind(this), 2000)
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf')
    });
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

  onSubmit = () => {
    Alert.alert(
      'BUY Item',
      'Do you want to buy this item now?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          console.log(this.props)
        }},
      ],
      {cancelable: false},
    );
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

            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end',}}>

              <View style={{
                  alignSelf: 'flex-end',
                  flex: 0,
                  padding: 5,
                  flexDirection: 'row',
                  marginVertical: 5}} >
                <View style={{ flex: 0.4 }}><Employee /></View>
                <View style={{ flex: 0.3 }}>
                  <View  style={{ flex:1, justifyContent: "center", alignItems: 'center' }}>
                    <Text>Total: {this.getTotalAmount()}</Text>
                  </View>
                </View>
                <View style={{ flex: 0.3 }}>
                  <Button
                    style={{flex:1,justifyContent: "center",alignItems: "center", alignSelf: 'stretch',}}
                    onPress={this.onSubmit}
                    success
                  >
                    <Text style={{ color: '#ffffff', textAlign: 'center', alignContent: 'center' }}> BUY </Text>
                  </Button>
                </View>
              </View>

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
