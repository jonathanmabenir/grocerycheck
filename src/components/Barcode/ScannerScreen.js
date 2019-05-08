import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native'
import ExpoScanner from './ExpoScanner';

class ScannerScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  componentDidMount() {
    this.setState({ isFocused: true });
  }
  componentWillUnmount() {
    this.focusListner.remove();
    this.blurListner.remove();
  }

  render() {
    if (!this.state.isFocused) {
      return (
        <View contentContainerStyle={styles.container} style={styles.spinner}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (<ExpoScanner navigation={this.props.navigation} />);
  }
}

const styles = {
  container: {
    flexGrow: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
        
export default ScannerScreen;