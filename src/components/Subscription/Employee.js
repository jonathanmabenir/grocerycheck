import React, { Component } from "react";
import { Subscription } from 'react-apollo';
// import { Picker } from "native-base";
import { Picker } from 'react-native';
import { fetchEmployees } from '../../queries/store';

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
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
								return (<Picker.Item key={`emp-${emp.id}`} label={emp.name} value={emp.id} />)
							})
							return (
								<Picker
									mode="dropdown"
									style={{ height: 50, width: 180, paddingBottom: 10, paddingTop: 10 }}
									selectedValue={this.state.selected}
									onValueChange={this.onValueChange.bind(this)}
								>
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