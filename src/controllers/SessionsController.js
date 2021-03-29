const { sign } = require('jsonwebtoken')
const { serverError, badRequest, ok } = require('../helpers/HttpHelper')
const { MissingParamError, AppError } = require('../errors')
const { HashProvider, fieldsValidator } = require('../utils')
const UsersRepository = require('../repositories/UsersRepository')
const authConfig = require('../configs/auth')

class SessionsController {
  async create (request, response) {
    try {
      const requiredFields = ['email', 'password']
      const validationFields = fieldsValidator(request.body, requiredFields)

      if (validationFields.status === false) {
        return badRequest(
          response,
          new MissingParamError(validationFields.missingField)
        )
      }

      const { email, password } = request.body

      const user = await UsersRepository.findByEmail(email)
      if (!user) {
        return badRequest(
          response,
          new AppError('Incorrect email/password combination', 401)
        )
      }

      const passwordMatched = await HashProvider.compareHash(password, user.password)

      if (!passwordMatched) {
        return badRequest(
          response,
          new AppError('Incorrect email/password combination', 401)
        )
      }

      const { secret, expiresIn } = authConfig.jwt
      const token = sign({}, secret, {
        subject: user.id,
        expiresIn
      })

      return ok(response, { user, token })
    } catch (err) {
      return serverError(response)
    }
  }
}

module.exports = SessionsController
