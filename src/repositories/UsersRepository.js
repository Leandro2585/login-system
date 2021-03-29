import { getRepository } from "typeorm"
import User from "../entities/User"

class UsersRepository {
  constructor () {
    this.ormRepository = getRepository(User)
  }
  async create (name, email, password) {
  
  }
  async findByEmail(email) {

  }
}

export default UsersRepository