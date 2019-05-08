import React from 'react';
import { Mutation } from 'react-apollo';
import { CheckBox } from 'native-base';
import { updateTodo } from '../../queries';


const UpdateCheckbox = ({todo}) => (
  <Mutation
    mutation={updateTodo}
    variables={{
      id: todo.id,
      is_completed: !todo.is_completed
    }}
  >
    {
      (updateTodo, { loading, data, error}) => {
        const submit = () => {
          updateTodo();
        }
        return (
          <CheckBox
            onPress={submit}
            checked={todo.is_completed}
            disabled={loading}
          /> 
        )     
      }
    }
  </Mutation>
)

export default UpdateCheckbox;