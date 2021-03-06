const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const app = express()
// const { sequelize } = require('./models')
require('dotenv').config()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

app.listen(config.port)
console.log(`Server started at ${config.port}`)

// sequelize.sync()
//   .then(() => {
//     app.listen(config.port)
//     console.log(`Server started on port ${config.port} `)
//   })
