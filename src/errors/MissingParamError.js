class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = `MissingParamError - Missing param: ${paramName}`
  }
}

module.exports = MissingParamError
