import { Cookies } from "quasar";
import FetchQL from 'fetchql'
const JWTToken =  Cookies.get("token");
const fetchql = new FetchQL({
  requestOptions: {
    credentials: 'include',
  },
  url: process.env.GRAPHQL_URI,
  headers: JWTToken ? { Authorization: JWTToken } : null
});
export default fetchql;
