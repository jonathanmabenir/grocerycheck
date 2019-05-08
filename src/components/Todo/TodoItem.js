import React from 'react';
import { Text, ListItem, Body, View } from 'native-base';
import DeleteButton from './DeleteButton';

const TodoItem = ({ todo, filter }) => {
  return (
  <View>
    <ListItem style={{ flex: 1 }}>
      {/* <UpdateCheckbox todo={todo} filter={filter}/> */}
      <Body>
        <Text style={{ alignSelf: 'center' }}>
          {todo.text}
        </Text>
      </Body>
      <DeleteButton todo={todo} />
    </ListItem>
    {/* <Toast visible={true} message={`Saving...`} /> */}
  </View>
)};

export default TodoItem;
