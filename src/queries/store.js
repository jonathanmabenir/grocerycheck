import gql from 'graphql-tag';

const fetchItems= gql`
subscription fetchItems {
	items {
    id
    name
    barcode
    price
  }
}`;


export { fetchItems };