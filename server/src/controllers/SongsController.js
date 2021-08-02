const Song = require('../models/Song')

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.findAll(10)
      res.send(songs)
    } catch (error) {
      res.status('500').send({
        error: 'An error occured trying to fetch songs'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.get_song(req.params.songId)
      res.send(song)
    } catch (error) {
      console.log('error', error)
      res.status('500').send({
        error: 'An error occured trying to fetch song'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (error) {
      console.log('error here', error)
      res.status('500').send({
        error: 'An error occured trying to create song'
      })
    }
  },
  async put (req, res) {
    try {
      const song = await Song.update(req.body, req.params.songId)
      res.send(song)
    } catch (error) {
      res.status('500').send({
        error: 'An error occured trying to update song'
      })
    }
  }
}
