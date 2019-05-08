import gql from 'graphql-tag';

const deleteTodo = gql`
mutation deleteTodo($id: Int) {
  delete_todo (
    where: {
      id: {
        _eq: $id
      }
    }
  ) {
    returning {
      id
    }
  }
}`;

const fetchTodos= gql`
subscription fetchTodos {
  todo(order_by: {updated_at: asc}) {
    id
    text
    is_completed
    created_at
    updated_at
  }
}`;


const insertProduct = gql`
mutation insertProduct($text: String) {
  insert_todo (
    objects: [
      {
        text: $text
      }
    ]
  ) {
    returning {
      text
    }
  }
}`;


const updateTodo = gql`
mutation updateTodo($id: Int, $is_completed: Boolean) {
  update_todo (
    where: {
      id: {
        _eq: $id
      }
    },
    _set: {
      is_completed: $is_completed,
      updated_at: "now()"
    }
  ) {
    returning {
      id
      text
      is_completed
      created_at
      updated_at
    }
  }
}
`;

export { deleteTodo, fetchTodos, insertProduct, updateTodo };