const express = require('express')
const { publicRoutes, privateRoutes } = require('./routes')

const app = express()
const port = process.env.API_PORT || 3333

app.use(express.json())
app.use(express.static('views'))
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')

app.use(publicRoutes)
app.use(privateRoutes)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
