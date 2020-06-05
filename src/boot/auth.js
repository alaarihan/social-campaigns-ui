import { Cookies } from "quasar";
import { refreshToken } from "../js/auth"

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ router, redirect, urlPath}) => {
  router.beforeEach(async (to, from, next) => {
    const authTokenCookie = Cookies.get('token')
    if(!authTokenCookie){
      await refreshToken().catch(err => {
        if( urlPath !== '/auth/login'){
          redirect('/auth/login')
        }
        return
      })
      console.log('No auth token cookie')
    }
    next()
  })

}
