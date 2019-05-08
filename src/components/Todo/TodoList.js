import React from 'react';
import { Subscription } from 'react-apollo';
import {
  Container, Header, Content,Spinner
} from 'native-base';
import TodoItem from './TodoItem';
import { Text, View } from 'react-native';
import { fetchTodos } from '../../queries';

const TodoList = ({item, filter}) => (
  <Subscription
    subscription={fetchTodos}
  >
    {
      ({ loading, data, error}) => {
        if (loading) {
          return (
            <Container>
              <Header />
              <Content>
                <Spinner color="#004A70"/>
              </Content>
            </Container>
          );
        }
        if (error) {
          return <Text>Error</Text>;
        }
        if (data.todo.length === 0) {
          return (
            <View style={{ alignItems: 'center', paddingTop: 10 }}>
              <Text>No {filter === 'all' ? '' : `${filter} `}todos</Text>
            </View>
          );
        }
        if (filter === 'active') {
          return data.todo.filter(t => !t.is_completed).map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              filter={filter}
            />
          ));
        }
        if (filter === 'completed') {
          return data.todo.filter(t => t.is_completed).map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              filter={filter}
            />
          ));
        }
        return data.todo.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            filter={filter}
          />
        ));
        
      }
    }
  </Subscription>
)

export default TodoList;
