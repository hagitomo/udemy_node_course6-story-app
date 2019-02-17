const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const app = express()

// passport 設定
require('./config/passport.js')(passport);

// routing
const auth = require('./routes/auth.js')
app.get('/', (req, res) => {
  res.send('hello')
})
app.use('/auth/', auth)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started ${port}……`)
})
