#!/usr/bin/env node
const config = require('config')
const { name, port: configPort } = config
const port = process.env.PORT ? parseInt(process.env.PORT) : configPort
const express = require('express')
const requestsLogger = require('./middlewares/requests_logger')
const cors = require('./middlewares/cors')

const app = express()
app.use(requestsLogger)

app.use(cors)

app.get('/', require('./controllers/home'))
app.get('/favicon.ico', require('./controllers/favicon'))
app.use('/public', require('./controllers/public'))
app.get('/:hashtag', require('./controllers/hashtag'))

app.listen(port, err => {
  if (err) console.error(err, 'startup error')
  else console.log(`${name} started on port ${port}`)
})
