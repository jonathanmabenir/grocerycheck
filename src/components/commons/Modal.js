import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import {withApollo} from 'react-apollo';

class ModalCam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.modalVisible!==prevState.modalVisible){
			return { modalVisible: nextProps.modalVisible};
		}
		return null;
	}

	setModalVisible(visible) {
			this.setState({modalVisible: visible});
			if(this.props.modalHandler) {
					this.props.modalHandler(visible)
			}

	}

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
				
      </View>
    );
  }
}

export default ModalCam;
