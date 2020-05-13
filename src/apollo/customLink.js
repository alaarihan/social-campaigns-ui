import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import fetch from "node-fetch";
import { w3cwebsocket } from "websocket";

const headers = {
  "x-hasura-admin-secret": process.env.GRAPHQL_SECRET
};
const onServer = process.env.SERVER;
const httpLinkConfig = {
  uri:
    "https://" +
    (process.env.GRAPHQL_URI ||
      "main-jpp5zbs80rp4e46g-gtw.qovery.io/v1/graphql"),
  headers
};

const wsLinkConfig = {
  uri:
    "wss://" +
    (process.env.GRAPHQL_URI ||
      "main-jpp5zbs80rp4e46g-gtw.qovery.io/v1/graphql"),
  options: {
    reconnect: true,
    connectionParams: {
      headers
    }
  }
};

if (onServer) {
  httpLinkConfig.fetch = fetch;
  wsLinkConfig.webSocketImpl = w3cwebsocket;
}
// Create the http link
const httpLink = new HttpLink(httpLinkConfig);

// Create the subscription websocket link
const wsLink = new WebSocketLink(wsLinkConfig);

const link = split(
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

export { link };
