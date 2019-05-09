import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { View } from 'react-native';
import {Font, AppLoading} from 'expo';
import {withApollo, compose, graphql} from 'react-apollo';

import InputBox from './InputBox';
import TodoList from './TodoList';
import ScannerScreen from '../Barcode/ScannerScreen';
import WithItems from '../Subscription/WithItems'

import { fetchItems } from '../../queries/store'

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

  async componentDidMount() {
    // let data = await this.props.client.query({
    //   query: fetchItems
    // })
    // // let data = await this.props.data
    // // let data = await this.props.client.subscribe({
    // //   query: fetchItems,
    // //   fetchPolicy: 'network-only'
    // // });
    // console.log(data)
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
        <ScannerScreen items={this.props.items}/>
        <InputBox/>
        <Content contentContainerStyle={{ justifyContent: 'space-between' }} >
          <View >
            <List>
              <TodoList items={this.props.items}/>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default compose(
  withApollo,
  WithItems
)(Todo);
