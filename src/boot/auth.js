import { Cookies } from "quasar";
import { refreshToken } from "../js/auth"

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ router, store, urlPath}) => {
  router.beforeEach(async (to, from, next) => {
    store.commit("appStore/setPageSetting", {
      setting: "backToUrl",
      value: null
    });
    store.commit("appStore/setActivePageName", null);
    const authTokenCookie = Cookies.get('token')
    if(!authTokenCookie && urlPath !== '/auth/login'){
      await refreshToken()
    }
    next()
  })

}
