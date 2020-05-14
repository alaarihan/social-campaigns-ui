// import something here
import Vue from 'vue'
import toNow from 'date-fns/distance_in_words_to_now'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  converter: (date, locale, converterOptions) => {
    const { includeSeconds = true, addSuffix = true } = converterOptions
    return toNow(date, {
      locale,
      includeSeconds,
      addSuffix
    })
  }
  
})

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}
