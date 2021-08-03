
// module.exports = (sequelize, DataTypes) => {
//   const Song = sequelize.define('Song', {
//     title: DataTypes.STRING,
//     artist: DataTypes.STRING,
//     genre: DataTypes.STRING,
//     album: DataTypes.STRING,
//     albumImage: DataTypes.STRING,
//     youtubeId: DataTypes.STRING,
//     lyrics: DataTypes.TEXT,
//     tab: DataTypes.TEXT
//   })

//   return Song
// }

const Promise = require('bluebird')
const pool = require('../db/pool')
const squel = require('squel')
const escape = require('sql-escape')
const Song = {
  create: async (song) => {
    const escapedSong = {
      ...song,
      lyrics: escape(song.lyrics),
      tab: escape(song.tab)
    }
    return new Promise((resolve, reject) => {
      const query = squel
        .insert()
        .into('songs')
        .setFieldsRows([escapedSong])
        .toString()
      pool.query(query, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        song.id = result.insertId
        resolve(song)
      })
    })
  },
  get_song: async (id) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .select()
        .from('songs')
        .where('id = ?', id)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows) {
          resolve(rows[0])
        }
      })
    })
  },
  findAll: async (limit) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .select()
        .from('songs')
        .limit(limit)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows) {
          resolve(rows)
        }
      })
    })
  },
  update: async (song, id) => {
    const escapedSong = {
      ...song,
      lyrics: escape(song.lyrics),
      tab: escape(song.tab)
    }
    return new Promise((resolve, reject) => {
      const query = squel
        .update()
        .table('songs')
        .setFields(escapedSong)
        .where('id = ?', id)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log('error here', err)
          reject(err)
        }
        if (rows) {
          resolve(rows)
        }
      })
    })
  }
}

module.exports = Song
