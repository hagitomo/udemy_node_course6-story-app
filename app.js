const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const app = express()

// template
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongoose
mongoose.promise = global.Promise
const keys = require('./config/keys.js')
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
}).then(() => {
  console.log('MongoDb connected')
}).catch((err) => {
  console.log(err)
})

// cookie
app.use(cookieParser())

// session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

// passport
app.use(passport.initialize())
app.use(passport.session())

// set global user (user認証されているか)
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// passport 設定
require('./config/passport.js')(passport);

// routing
const index = require('./routes/index.js')
const auth = require('./routes/auth.js')
app.use('/', index)
app.use('/auth/', auth)

// port設定
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started ${port}……`)
})
