import React, { Component } from 'react';
import { View, Text, Vibration, StyleSheet, ListView, Dimensions } from 'react-native'; 
import { Camera, BarCodeScanner, Permissions, Constants } from 'expo';
import {withApollo, compose} from 'react-apollo';
import { insertProduct } from '../../queries';


import withContext from "../Subscription/WithContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff', 
    marginTop: Constants.statusBarHeight
  },
  scanScreenMessage: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});

var GroceryItems = [] ; 

class ExpoScanner extends Component {
  constructor(props) {
    super(props);

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.scannedCode = null;

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      showModal: false,  
        ReturnMessage:"" 
    };
  } 

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await this.setState({hasCameraPermission: status === 'granted'});
    await this.resetScanner();
  }

  onBarCodeRead({ type, data } ) {
    if ((type === this.state.scannedItem.type && data === this.state.scannedItem.data) || data === null) {
      return;
    } 
  
    Vibration.vibrate(100);

    const { items } = this.props.items;

    let itemSearched = items.find(({barcode}) => barcode === data);

    if(itemSearched==null)
      return;

    //Adding Items To Array.
    GroceryItems.push( itemSearched );
 
    this.props.context.updateValue( 'GroceryItems', GroceryItems);

    this.setState({ 
      scannedItem: { data : itemSearched.name, type },
      // scannedItem: { data : GroceryItems, type },
    }); 
    
  }

  renderMessage() {
    if (this.state.scannedItem && this.state.scannedItem.type) {
      const { type, data } = this.state.scannedItem;
      return (
        <Text style={styles.scanScreenMessage}>
          {`Scanned \n ${data}`}
        </Text>
      );
    }
    return <Text style={styles.scanScreenMessage}>Focus the barcode to scan.</Text>;
  }

  resetScanner() {
    this.scannedCode = null;
    this.setState({
      scannedItem: {
        type: null, 
        data: null
      }
    });
  }

  // var categories = [{ id: 0, text: 'hasan' }, 
  //   { id: 1, text: 'erkan' },
  //   { id: 2, text: 'veli' }];
 
  renderCategories() {
      return SampleArray.map((item, index) => <Text key={index}>{item.name}</Text>);
  }
  renderRow ({ item }) {
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.name} 
      />
    )
  } 

  render() {
    const { hasCameraPermission } = this.state;

    // if (hasCameraPermission === null) {
    //   return <Text>Requesting for camera permission</Text>;
    // }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
 
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeScanned={ this.onBarCodeRead}
              style={{...StyleSheet.absoluteFill, height: 100}}
            />
            {this.renderMessage()}  
          </View>  
        </View> 
    );
  }
} 


export default compose(
  withApollo, 
  withContext
)(ExpoScanner);
