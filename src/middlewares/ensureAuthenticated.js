const { verify } = require('jsonwebtoken')
const authConfig = require('../configs/auth')
const { AppError } = require('../errors')
const { badRequest } = require('../helpers/HttpHelper')

function ensureAuthenticated (request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return badRequest(response, new AppError('JWT token is missing'))
  }

  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded
    request.user = {
      id: sub
    }

    return next()
  } catch (err) {
    return badRequest(response, new AppError('Invalid JWT token', 401))
  }
}

module.exports = ensureAuthenticated
