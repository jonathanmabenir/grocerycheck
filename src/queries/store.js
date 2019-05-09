import gql from 'graphql-tag';

const fetchItems= gql`
	subscription fetchItems {
		items {
			id
			name
			barcode
			price
		}
	}
`;

const fetchEmployees= gql`
	subscription {
  	employees(where: {active: {_eq: true}}, order_by: {name: asc}) {
			id
			name
			active
		}
	}

`;

export { fetchItems, fetchEmployees };