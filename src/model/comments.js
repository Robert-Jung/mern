const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const CommentsSchema = new Schema({
  author: String,
  text: String
})

module.exports = mongoose.model('Comment', CommentsSchema)
