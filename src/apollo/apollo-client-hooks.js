import { link } from "./customLink";

export function apolloClientBeforeCreate({ apolloClientConfigObj }) {
  apolloClientConfigObj.link = link;
  // if needed you can modify here the config object used for apollo client
  // instantiation
}

export function apolloClientAfterCreate(/* { apolloClient, app, router, store, ssrContext, urlPath, redirect } */) {
  // if needed you can modify here the created apollo client
}
