import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from '../../navigation/AppNavigator';
import Sanaku from '../components/Todo'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Sanaku />
          {/* <AppNavigator /> */}
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
