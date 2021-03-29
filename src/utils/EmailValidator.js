const validator = require('validator')

const EmailValidator = {
  isValid (email) {
    return validator.isEmail(email)
  }
}

module.exports = EmailValidator
