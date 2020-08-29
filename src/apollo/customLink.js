import { HttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { getJWTToken } from "../js/auth";
import refreshAuthTokenIfNeeded from "./refresh-auth-token-fetch";

let authCookie = getJWTToken();
let headers = authCookie ? { authorization: `Bearer ${authCookie}` } : {};
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  authCookie = getJWTToken();
  headers = authCookie ? { authorization: `Bearer ${authCookie}` } : {};
  operation.setContext({
    headers
  });

  return forward(operation);
});

const httpLinkConfig = {
  uri: `https://${JSON.stringify(process.env.GRAPHQL_URI)}`,
  headers,
  fetch: refreshAuthTokenIfNeeded
};

const wsLinkConfig = {
  uri: `wss://${JSON.stringify(process.env.GRAPHQL_URI)}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers
    }
  }
};

// Create the http link
const httpLink = new HttpLink(httpLinkConfig);

// Create the subscription websocket link
const wsLink = new WebSocketLink(wsLinkConfig);

const splitedLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const customLink = new ApolloLink.from([
  authMiddleware,
  splitedLink
]);

export { customLink };
