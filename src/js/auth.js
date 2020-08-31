import { Cookies } from "quasar";
import fetchql from "./fetchql";
import logRemotely from "./logger";

async function refreshToken() {
  return await fetchql
    .query({
      operationName: "refresh_token",
      query: `mutation refresh_token{
        refresh_token {
          jwt_token
          jwt_expires_in
        }
      }`
    })
    .then(res => {
      if (res && res.errors) {
        throw res.errors;
      }
      Cookies.set("token", res.data.refresh_token.jwt_token, {
        expires: `${res.data.refresh_token.jwt_expires_in / 1000}s`,
        path: "/"
      });
      return res.data.refresh_token
    })
    .catch(async error => {
      console.error(error);
      await logRemotely(error)
      window.location.replace("/auth/login");
    });
}

function getJWTToken() {
  return Cookies.get("token");
}

export { refreshToken, getJWTToken };
