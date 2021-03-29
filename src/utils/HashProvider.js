const { hash, compare } = require('bcryptjs')

const HashProvider = {
  generateHash (payload) {
    return hash(payload, 8)
  },
  compareHash (payload, hashed) {
    return compare(payload, hashed)
  }
}

module.exports = HashProvider
