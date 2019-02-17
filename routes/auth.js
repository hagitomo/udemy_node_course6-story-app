const express = require('express')
const router = express.Router()
const passport = require('passport')

// ログイン画面
router.get('/google/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback/',
  passport.authenticate('google', { failureRedirect: '/auth/google/' }),
  (req, res) => {
    // 認証時のリダイレクト先
    res.redirect('/')
  }
)

module.exports = router
