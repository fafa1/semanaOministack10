const axios = require('axios')
const Dev = require('../models/dev')

module.exports = {
  async index(req, res) {
    const devs = await Dev.find()
    res.json(devs)
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body

    const devExiste = await Dev.findOne({ github_username })

    if (devExiste) {
      res.json({error: 404, message: 'Usuário já existente'})
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name = login, avatar_url, bio } = response.data

      const techsArray = techs.split(',').map(tech => tech.trim())

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      // Acredito que esta parte deve ficar em outo lugar.
      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })

      return res.json(dev)
    } catch (error) {
      console.error('Error', error)
    }
  }
}