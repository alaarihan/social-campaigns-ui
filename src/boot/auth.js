import { Cookies } from "quasar";
import { refreshToken } from "../js/auth"

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ router, redirect, urlPath}) => {
  router.beforeEach(async (to, from, next) => {
    const authTokenCookie = Cookies.get('token')
    if(!authTokenCookie && urlPath !== '/auth/login'){
      await refreshToken()
    }
    next()
  })

}
