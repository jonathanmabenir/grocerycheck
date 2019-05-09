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
    await Font.loadAsync({
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
      return <AppLoading />;
    }
    return (
      <Container>

        <ScannerScreen  style={{ flex: 1 }} items={this.props.items}/>

        <Content style={{ flex: 0.8 }}>
          <View >
            <InputBox />
          </View>
          <View  style={{ flex: 3 }} >
            <List>
              <TodoList items={this.props.items}/>
            </List>
          </View>
        </Content>
        <View
          style={{
            padding: 5,
            marginVertical: 5,
            borderTopWidth: 0.5
          }}
        >
          <Employee />
        </View>

      </Container>
    );
  }
}

export default compose(
  withApollo,
  WithItems
)(Todo);
