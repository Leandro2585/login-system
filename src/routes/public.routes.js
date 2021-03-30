const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const SessionsController = require('../controllers/SessionsController')

const publicRoutes = Router()

const usersController = new UsersController()
const sessionsController = new SessionsController()

publicRoutes.post('/user', usersController.create)
publicRoutes.post('/session', sessionsController.create)

publicRoutes.get('/signup', (requets, response) => {
  response.render('signup.ejs')
})

publicRoutes.get('/signin', (requets, response) => {
  response.render('signin.ejs')
})

module.exports = publicRoutes
