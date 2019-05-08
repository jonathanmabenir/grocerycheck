import React from 'react';
import { Button } from 'native-base';
import { View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Filters = ({filter, setFilter}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width,
        marginTop: 20 }}
    >
      <Button
        transparent
        bordered={filter === 'all'}
        onPress={() => setFilter('all')}
        >
          <Text> All </Text>
        </Button>

      <Button
        transparent
        bordered={filter === 'completed'}
        onPress={() => setFilter('completed')}
        >
          <Text> Completed </Text>
        </Button>

      <Button
        transparent
        bordered={filter === 'active'}
        onPress={() => setFilter('active')}
        >
          <Text> Active </Text>
        </Button>
    </View>
  )
}

export default Filters;