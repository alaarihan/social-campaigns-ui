import { refreshToken } from "../js/auth";

const refreshAuthTokenIfNeeded = async (uri, options) => {
    const initialRequest = await fetch(uri, options)
  
    const clonedRequest = await initialRequest.clone()
    const json = await clonedRequest.json()
    const errorCodes = ['invalid-jwt', 'invalid-headers', 'validation-failed']
    const accessTokenHasExpired = json && json.errors && json.errors[0] && json.errors[0].extensions && errorCodes.includes( json.errors[0].extensions.code)
  
    if (accessTokenHasExpired) {
      console.log('accessToken has expired, try getting a new one')
      await refreshToken().then(({jwt_token}) => {
        options.headers.authorization = `Bearer ${jwt_token}`
      })

      return fetch(uri, options).catch(res => {
        console.log('Could not update the accessToken #2')
      })
    }
  
    return initialRequest
  }

export default refreshAuthTokenIfNeeded;
