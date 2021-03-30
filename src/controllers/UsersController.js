const { badRequest, serverError, ok } = require('../helpers/HttpHelper')
const { MissingParamError, InvalidParamError, AppError } = require('../errors')
const { HashProvider, EmailValidator, generateUniqueId } = require('../utils')
const UsersRepository = require('../repositories/UsersRepository')
const fieldsValidator = require('../utils/FieldsValidator')

class UsersController {
  async create (request, response) {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      const validationFields = fieldsValidator(request.body, requiredFields)

      if (validationFields.status === false) {
        return badRequest(
          response,
          new MissingParamError(validationFields.missingField)
        )
      }
      const { name, email, password, confirmPassword } = request.body

      if (password !== confirmPassword) {
        return badRequest(response, new InvalidParamError('confirmPassword'))
      }

      const isValid = EmailValidator.isValid(email)

      if (!isValid) {
        return badRequest(response, new InvalidParamError('email'))
      }

      const checkUserExists = await UsersRepository.findByEmail(email)

      if (checkUserExists) {
        return badRequest(response, new AppError('Email address already used.'))
      }

      const hashedPassword = await HashProvider.generateHash(password)
      const id = generateUniqueId()

      const user = await UsersRepository.create({
        id,
        name,
        email,
        password: hashedPassword
      })

      return ok(response, user)
    } catch (err) {
      return serverError(response)
    }
  }
}

module.exports = UsersController
