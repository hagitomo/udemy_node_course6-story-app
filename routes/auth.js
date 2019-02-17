const express = require('express')
const router = express.Router()
const passport = require('passport')

// ログイン画面
router.get('/google/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // 認証時のリダイレクト先
    res.redirect('/dashboard/')
  }
)

// 認証を確認
router.get('/verify/', (req, res) => {
  if (req.user) {
    console.log(req.user)
  } else {
    console.log('not auth')
  }
})

// logout
router.get('/logout/', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
