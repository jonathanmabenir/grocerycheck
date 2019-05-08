import React from 'react';
import { Mutation } from 'react-apollo';
import { Icon } from 'native-base';
import { deleteTodo } from '../../queries';

const DeleteButton = ({todo}) => (
  <Mutation
    mutation={deleteTodo}
    variables={{
      id: todo.id
    }}
  >
    {
      (deleteTodo, { loading, data, error}) => {
        const submit = () => {
          if (loading) return;
          deleteTodo();
        }
        return (
          <Icon
            name="md-trash"
            style={{ color: loading ? 'gray' : '#EE001C' }}
            onPress={submit}
            disabled={loading}
          />
        );
      }
    }
  </Mutation>
)

export default DeleteButton;
