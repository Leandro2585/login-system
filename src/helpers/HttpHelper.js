import { ServerError } from '../errors'

export const badRequest = (error) => ({
  statusCode: 400,
  body: error
})

export const serverError = () => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (data) => ({
  statusCode: 200,
  body: data
})
