const express = require('express')
const routes = require('./routes')

const app = express()
const port = process.env.API_PORT || 3333

app.use(express.static('views'))
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')
app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
