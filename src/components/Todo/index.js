import React, { Component } from 'react';
import { Container, Content, Button  } from 'native-base';
import { View , Text, Alert } from 'react-native';
import {Font, AppLoading} from 'expo';
import {withApollo, compose} from 'react-apollo';

import InputBox from './InputBox';
import ScannerScreen from '../Barcode/ScannerScreen';
import WithItems from '../Subscription/WithItems';
import Employee from '../Subscription/Employee';

import GroceryContext from '../GroceryContext';
import GroceryItem from './GroceryItem'; 

import {insertOrders} from '../../queries/store'

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      loading: true, 
      GroceryItems:[],
      GroceryItemIds:[],
      Employee:{}, 
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
  
  setEmployee = ( val) => {   
    this.setState({ Employee: val });  
  }

  setTotalAmount = ( val) => {   
    this.setState({ totalAmount: val });  
  }

  removeElement = (itemToken) => { 
    this.setState({GroceryItems: this.state.GroceryItems.filter(function(item) { 
      return item.itemToken !== itemToken
    })}); 
  }

  addScannedItem = (scannedItem) => {  
    this.setState(prevState => ({
      GroceryItems: [
          ...prevState.GroceryItems, scannedItem
      ]
    }))   

  }

  getFinalGroceryItemIds(){
    //filter groceryItem array to produce groceryItemId array
    this.state.GroceryItems.map((item) => {  
      var groceryItemId = new Object(); 
      groceryItemId.item_id = item.id
  
      this.setState(prevState => ({
        GroceryItemIds: [
            ...prevState.GroceryItemIds, groceryItemId
        ]
      }))  

    })
    
    return this.state.GroceryItemIds; 
  }

  getTotalAmount(){ 
    let total = 0; 
    this.state.GroceryItems.map((item) => { 
      total = total +  item.price; 
    })  
    return total; 
  }

  /** checks if object is empty **/
  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    } 
    return true;
  }

  onCompleted() {   
    var title = 'Order Saved';
    var message = 'Thank you for purchasing!'; 

    //empty the list
    this.setState({ 
      GroceryItems: []
    });  
 
    Alert.alert(
      title,
      message,
      [ 
        {text: 'OK', onPress: async () => {}},
      ],
      {cancelable: false},
    ); 
    
  } 

  onSubmit = () => {   
    let amount =  this.getTotalAmount();
    if((this.isEmpty(this.state.Employee)) ||
       (this.state.GroceryItems.length == 0) ){ 

      var title = 'No Selection';
      var message = 'Please select employee'; 
      if(this.state.GroceryItems.length == 0){  
        message = 'No Items Selected';
      }

      Alert.alert(
        title,
        message,
        [ 
          {text: 'OK', onPress: async () => {}},
        ],
        {cancelable: false},
      );
      return;
    } 

    Alert.alert(
      'Order Details',  
      '\nNumber of Items: '+ this.state.GroceryItems.length +
      '\nAmount: Php'+ amount +
      '\nEmployee: '+ this.state.Employee.name,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'BUY', onPress: async () => {

          await this.props.client.mutate({
            mutation: insertOrders,
            variables: {
              amount: amount,
              date_ordered: "now()", 
              employee_id: this.state.Employee.id,  
              order_items: this.getFinalGroceryItemIds()
            },
            onCompleted: this.onCompleted()

          })
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
        <GroceryContext.Provider value={{
          state: this.state,
          setEmployee: this.setEmployee,
          setTotalAmount: this.setTotalAmount,
          removeElement: this.removeElement,
          addScannedItem: this.addScannedItem
          }}>

          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
        
          <ScannerScreen items={this.props.items} style={{ height: 50}} />  

          <View style={{ height: 50}}  style={{  backgroundColor: '#ffffff' }} /> 

            <Content contentContainerStyle={{ justifyContent: 'space-between' }} style={{ flex: 0.6, backgroundColor: '#ffffff' }}>  
                <View >
                  <InputBox />
                </View>
                <View>   
                  { this.state.GroceryItems.map((item, key)=>( 
                    <GroceryItem
                      key={key}
                      data={item} 
                      itemCount={key}
                    /> 
                    )
                  )} 
                </View>
            </Content>

            <View style={{flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end',}}>
                <View style={{
                    alignSelf: 'flex-end',
                    flex: 0,
                    padding: 5,
                    flexDirection: 'row',
                    marginVertical: 5}} >
                    <View style={{ flex: 0.4 }}>
                      <Employee />
                    </View>
                    <View style={{ flex: 0.3 }}>
                      <View  style={{ flex:1, justifyContent: "center", alignItems: 'center' }}>
                        <Text>Total: Php {this.getTotalAmount()}</Text>
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
