import { HttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { RetryLink } from "apollo-link-retry";
import { getMainDefinition } from "apollo-utilities";
import { getJWTToken, refreshToken } from "../js/auth";
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

const subscriptionMiddleware = {
  applyMiddleware: async function(options, next) {
    // add the authorization to the headers
    authCookie = getJWTToken();
    if (!authCookie) {
      await refreshToken();
      authCookie = getJWTToken();
    }
    headers = authCookie ? { authorization: `Bearer ${authCookie}` } : {};
    options.connectionParams = {
      headers
    };
    next();
  }
};

const httpLinkConfig = {
  uri: `https://social-like-api.future7.com/v1/graphql`,
  headers,
  fetch: refreshAuthTokenIfNeeded
};

const wsLinkConfig = {
  uri: `wss://social-like-api.future7.com/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => {
      authCookie = getJWTToken();
      headers = authCookie ? { authorization: `Bearer ${authCookie}` } : {};
      return { headers };
    }
  }
};
const retryLink = new RetryLink({
  delay: {
    initial: 500,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 50,
    retryIf: (error, _operation) => !!error
  }
});

// Create the http link
const httpLink = new HttpLink(httpLinkConfig);

// Create the subscription websocket link
const wsLink = new WebSocketLink(wsLinkConfig);

wsLink.subscriptionClient.use([subscriptionMiddleware]);

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
  retryLink,
  splitedLink
]);

export { customLink };
