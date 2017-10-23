import 'isomorphic-fetch'

const JSONHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const API_BASE = 'http://127.0.0.1:4000/api'

export const serializeParams = params => {
  const searchParams = new URLSearchParams()

  for (let key of Object.keys(params)) {
    searchParams.set(key, params[key])
  }

  return searchParams.toString()
}

export const xhr = async (url, options) => {
  let headers = Object.assign({}, JSONHeaders)

  // If we need to centralize the token, create a function to retrieve
  // const token = fetchToken()

  if (options.searchParams) {
    url += '?' + serializeParams(options.searchParams)
    delete options.searchParams
  }

  // If we want to include a token, just reuse code below.
  // if (token) {
  //   headers['Authorization'] = `${token}`
  // }

  const res = await fetch(url, Object.assign({ headers }, options))

  // If status is 204, no body was sent and no need to parse body. Just return empty object.
  if (res.status === 204) {
    return {}
  }

  if (res.status >= 500) {
    /*
      We can grab the errors here and centrilize how we handle errors.
     */
    console.log('An error occurred...')
  }

  const json = await res.json()

  if (res.status >= 200 && res.status < 300) {
    return json
  }

  const error = new Error(res.statusText)
  error.status = res.status
  const defaultMessage = 'An error occurred. Please try again or contact support.'
  error.response = json.verbose || json.code || defaultMessage
  throw error
}