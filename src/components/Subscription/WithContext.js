import React from 'react'; 
import GroceryContext from "../GroceryContext"; 
 
const withContext = Component => props => (
      <GroceryContext.Consumer>     
          {context => <Component {...props} context={context} />}  
      </GroceryContext.Consumer>    
    ); 

export default withContext