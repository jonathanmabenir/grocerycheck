import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import { View, Text } from 'react-native';
import { InputGroup, Input, Button } from 'native-base';
import { insertProduct } from '../../queries';

class InputBox extends Component {
  state = {
    text: ''
  }
  render() {
    const { text } = this.state;

    return (
      <Mutation
        mutation={insertProduct}
        variables={{text}}
      >
        {
          (insertProduct, {data, loading, error}) => {
            const onSubmit = () => {
              insertProduct();
              this.setState({ text: ''});
            }
            return (
              <View
                style={{
                  alignSelf: 'flex-end',
                  flex: 0,
                  padding: 5,
                  flexDirection: 'row',
                  marginVertical: 5
                }}
              >
                <InputGroup
                  borderType="underline"
                  style={{ flex: 0.8 }}
                >
                  <Input
                    placeholder="Product ID..."
                    value={text}
                    onChangeText={inputText => this.setState({ text: inputText })}
                    onSubmitEditing={onSubmit}
                    maxLength={35}
                  />
                </InputGroup>
                <Button
                  style={{ flex: 0.2, marginLeft: 15 }}
                  onPress={onSubmit}
                  success
                >
                  <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                    <Text style={{ color: '#ffffff' }}> ADD </Text>
                  </View>
                </Button>
              </View>
            );
          }
        }
      </Mutation>
    )

  }
}

export default InputBox;
