import React from 'react';
import { Subscription } from 'react-apollo';
import { fetchItems } from '../../queries/store';

const WithItems = Children => props => (
  <Subscription
    subscription={fetchItems}
  >{
    ({ loading, data, error}) => {
      if (!loading) {
        return (
          <Children items={data} {...props}/> 
        );
      }
      return null
    }
  }
  </Subscription>
);

export default WithItems
