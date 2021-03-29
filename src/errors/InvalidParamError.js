class InvalidParamError extends Error {
  constructor (paramName) {
    super(`Invalid param: ${paramName}`)
    this.name = `InvalidParamError - Invalid param: ${paramName}`
  }
}

module.exports = InvalidParamError
