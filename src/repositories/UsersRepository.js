const connection = require('../database/connection')

const UsersRepository = {
  async create ({ id, name, email, password }) {
    await connection('user').insert({
      id,
      name,
      email,
      password
    })

    const user = await connection('user')
      .where('id', id)
      .select('*')
      .first()

    return user
  },
  async findByEmail (email) {
    const user = await connection('user')
      .where('email', email)
      .select('*')
      .first()

    return user || undefined
  }
}

module.exports = UsersRepository
