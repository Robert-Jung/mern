'use strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Comment = require('./src/model/comments')

const app = express()
const router = express.Router()

const dotenv = require('dotenv')
dotenv.config()
const mongoUrl = process.env.MONGOLAB_URI

const port = process.env.API_PORT || 3001
mongoose.connect(mongoUrl)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized!'})
})

router.route('/comments')
  .get((req, res) => {
    Comment.find((err, comments) => {
      if (err)
        res.send(err)
      res.json(comments)
    })
  })
  .post((req, res) => {
    let comment = new Comment()
    comment.author = req.body.author
    comment.text = req.body.text

    comment.save((err) => {
      if (err)
        res.send(err)
      res.json({ message: 'Comment successfully added!'})
    })
  })

router.route('/comments/:comment_id')
  .put((req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err)
        res.send(err)
      (req.body.author) ? comment.author = req.body.author : null
      (req.body.text) ? comment.text = req.body.text : null
      comment.save((err) => {
        if (err) res.send(err)
        res.json({ message: 'Comment has been updated' })
      })
    })
  })

app.use('/api', router)

app.listen(port, () => {
  console.log(`api running on port ${port}`)
})
