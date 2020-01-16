const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
mongoose.connect('mongodb+srv://oministack10:fagner28@cluster0-edoag.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())

app.use(routes)

app.listen(3000, () => {
  console.log('executando na porta 3000')
})