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

const insertOrders= gql `
	mutation insertOrders(
		$amount: numeric, 
		$date_ordered: timestamptz, 
		$employee_id: Int, 
		$order_items: [order_items_insert_input!]!
	){
		insert_orders(objects: {
			amount: $amount, 
			date_ordered: $date_ordered, 
			employee_id: $employee_id, 
			order_items: { data: $order_items }
		}) {
		returning {
			employee {
				name
			}
			order_items {
				item {
					name
				}
			}
			amount
		}
		}
	}
`

const fetchEmployees= gql`
	subscription {
  	employees(where: {active: {_eq: true}}, order_by: {name: asc}) {
			id
			name
			active
		}
	}

`;

export { fetchItems, fetchEmployees, insertOrders };