const express = require('express')
const router = express.Router()
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth.js')

// /index
router.get('/',ensureGuest, (req, res) => {
  res.render('index/index')
})
// /dashboard
router.get('/dashboard/', ensureAuthenticated, (req, res) => {
  res.render('index/dashboard')
})

// /about
router.get('/about/', (req, res) => {
  res.render('index/about')
})

module.exports = router
