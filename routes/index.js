const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth.js')

// story Schema
require('../models/Stories.js')
const Story = mongoose.model('story')

// /index
router.get('/',ensureGuest, (req, res) => {
  res.render('index/index')
})
// /dashboard
router.get('/dashboard/', ensureAuthenticated, (req, res) => {
  Story.find({ user : req.user.id })
  .populate('user')
  .then( stories => {
    res.render('index/dashboard', { stories })
  })
})

// /about
router.get('/about/', (req, res) => {
  res.render('index/about')
})

module.exports = router
