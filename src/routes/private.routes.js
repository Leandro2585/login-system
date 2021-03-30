const { Router } = require('express')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const privateRoutes = Router()

privateRoutes.get('/profile', ensureAuthenticated, (request, response) => {
  response.json({ message: 'This route requires the user to be autheticated' })
})

module.exports = privateRoutes
