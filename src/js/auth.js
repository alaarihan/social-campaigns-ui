import { Cookies } from "quasar";
import fetchql from "./fetchql";

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

async function logRemotely(error){
  await fetch('https://logs-01.loggly.com/inputs/0401038d-dbae-47fb-b166-e97e1f551210/tag/http/', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(error),
})
.catch((error) => {
  console.error('Error:', error);
});
}

export { refreshToken, getJWTToken };
