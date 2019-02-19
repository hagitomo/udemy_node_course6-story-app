const express = require('express')
const router = express.Router()

// /index
router.get('/', (req, res) => {
  res.render('index/index')
})
// /dashboard
router.get('/dashboard/', (req, res) => {
  res.render('index/dashboard')
})

// /about
router.get('/about/', (req, res) => {
  res.render('index/about')
})

module.exports = router
