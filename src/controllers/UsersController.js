import { badRequest, serverError } from '../helpers/HttpHelper'
import { MissingParamError, InvalidParamError } from '../errors'
import EmailValidator from '../utils/EmailValidator'

class UsersController {
  constructor() {
    this.emailValidator = new EmailValidator()
  }
  async create(request, response) {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      
      for(const field of requiredFields) {
        if(!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, confirmPassword } = request.body
    
      if(password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }

      const isValid = this.emailValidator.isValid(email)
      
      if(!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return ok()
    } catch (err) {
      return serverError()
    }
  }
}