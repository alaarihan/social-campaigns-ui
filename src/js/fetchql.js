import { Cookies } from "quasar";
import FetchQL from 'fetchql'
const JWTToken =  Cookies.get("token");
const fetchql = new FetchQL({
  requestOptions: {
    credentials: 'include',
  },
  url:`https://${process.env.GRAPHQL_URI}`,
  headers: JWTToken ? { Authorization: JWTToken } : null
});
export default fetchql;
