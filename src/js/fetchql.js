import { Cookies } from "quasar";
import FetchQL from 'fetchql'
const JWTToken =  Cookies.get("token");
const fetchql = new FetchQL({
  requestOptions: {
    credentials: 'include',
  },
  url:`https://social-like-api.future7.com/v1/graphql`,
  headers: JWTToken ? { Authorization: JWTToken } : null
});
export default fetchql;
