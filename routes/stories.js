const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {
  ensureAuthenticated,
  ensureGuest
} = require('../helpers/auth.js')

// story Schema
require('../models/Stories.js')
const Story = mongoose.model('story')

// get /stories/
router.get('/', (req, res) => {
  // 公開がpublicのものを表示
  Story.find({
      status: 'public'
    })
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories
      })
    })
})

// get /stories/add
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add')
})

// post /stories/
router.post('/', (req, res) => {
  // コメント投稿可能か
  let allowComments
  if (req.body.allowComments) {
    allowComments = true
  } else {
    allowComments = false
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id,
  }

  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`)
    })
})

// get /stories/edit
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Story.findOne({
      _id: req.params.id
    })
    .populate('user')
    .then(story => {
      res.render('stories/edit', {
        story
      })
    })
})

//put /stories/:id 編集後にDB書き換え
router.put('/:id', (req, res) => {
  Story.findOne({
      _id: req.params.id
    })
    .then(story => {
      // コメント投稿可能か
      let allowComments
      if (req.body.allowComments) {
        allowComments = true
      } else {
        allowComments = false
      }

      story.title = req.body.title
      story.body = req.body.body
      story.status = req.body.status
      story.allowComments = allowComments

      story.save()
        .then(story => {
          res.redirect('/dashboard/')
        })
    })
})

// get /stories/show
router.get('/show/:id', (req, res) => {
  Story.findOne({
      _id: req.params.id
    })
    .populate('user')
    .then(story => {
      res.render('stories/show', {
        story
      })
    })
})

// DELETE stories
router.delete('/:id', (req,res) => {
  Story.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('/dashboard/')
    })
})

module.exports = router
