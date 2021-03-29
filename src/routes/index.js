const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const SessionsController = require('../controllers/SessionsController')

const routes = Router()

const usersController = new UsersController()
const sessionsController = new SessionsController()

routes.post('/user', usersController.create)
routes.post('/session', sessionsController.create)

routes.get('/signup', (requets, response) => {
  response.render('signup.ejs')
})

routes.get('/signin', (requets, response) => {
  response.render('signin.ejs')
})

module.exports = routes
