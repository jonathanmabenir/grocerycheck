import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { View } from 'react-native';
import * as Expo from 'expo';

import InputBox from './InputBox';
import TodoList from './TodoList';
import ScannerScreen from '../Barcode/ScannerScreen';

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      loading: true 
    };
  }

  setFilter = (type) => {
    this.setState({
      filter: type
    })
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf')
    });
    setTimeout(function () {
      this.setState({ loading: false });
    }.bind(this), 2000)
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <ScannerScreen />
        <InputBox filter={this.state.filter}/>
        <Content contentContainerStyle={{ justifyContent: 'space-between' }} >
          <View >
            <List>
              <TodoList filter={this.state.filter}/>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Todo;
