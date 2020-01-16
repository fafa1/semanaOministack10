const { Router } = require('express')
const { store, index } = require('./controllers/DevController')

const routes = Router()

routes.get('/devs', index)
routes.post('/devs', store)

module.exports = routes