const { ServerError } = require('../errors')

const badRequest = (response, error) => {
  return response.status(400).json(error)
}

const serverError = (response) => {
  return response.status(500).json(new ServerError())
}

const ok = (response, data) => {
  return response.status(200).json(data)
}

module.exports = {
  ok,
  badRequest,
  serverError
}
