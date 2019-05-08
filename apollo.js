import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { GRAPHQL_ENGINE_URL } from './constants';
const GRAPHQL_ENDPOINT = `${GRAPHQL_ENGINE_URL.split('//')[1]}/v1alpha1/graphql`;

const httpLink = new HttpLink({
  uri: `http://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
