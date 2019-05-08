import React from 'react';
import { View } from 'react-native';
import { Icon } from 'expo';

const TabBarIcon = (props) => {
  return (
    <View>
      <Icon.Ionicons
        name={props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={props.focused ? '#2f95dc' : '#ccc'}
      />
    </View>
  );

}

export default TabBarIcon