import React, { Component } from "react";
import { Subscription } from 'react-apollo';
import { Picker } from 'react-native';
import { fetchEmployees } from '../../queries/store';

import {compose} from 'react-apollo';  
import withContext from "../Subscription/WithContext";   

class Employee extends Component {
  constructor(props) {
		super(props);
		 
    this.state = {
			pickerSelected: '',
  	  defaultSelected: 'Select branch\'s name',

      selected: "key1"
    };
	}
	
  onValueChange(value) { 
		if(value==0)
			return;

		this.setState({
      selected: value
		});   
  
    this.props.context.setEmployee( value); 
	}  

  render() {
    return (
			<Subscription
    		subscription={fetchEmployees}
				>{
					({ loading, data, error}) => {
						if (!loading) {
							const { employees } = data;
							const allEmployess = employees.map(emp => { 
								// return (<Picker.Item key={`emp-${emp.id}`} label={emp.name} value={emp.id} />)
								return (<Picker.Item key={`emp-${emp.id}`} label={emp.name} value={emp} />)
							})  
							return ( 
								<Picker
									mode="dropdown"
									style={{ height: 50, width: 180, paddingBottom: 10, paddingTop: 10 }}
									selectedValue = {this.state.selected} 
								  onValueChange={this.onValueChange.bind(this)} 
								>
 									<Picker.Item label='Please select Employee...' value='0' />
								 	{allEmployess}
								</Picker>
							);
						}
						return null
					}
				}
				</Subscription>
    );
  }
}


export default compose( 
  withContext
)(Employee);
