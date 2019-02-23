const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const app = express()

// template
const { truncate, stripTags, formatDate, select } = require('./helpers/hbs.js')
app.engine('handlebars', exphbs({
  helpers: {
    truncate, stripTags, formatDate, select
  },
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// method override
app.use(methodOverride('_method'))

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
const stories = require('./routes/stories.js')
const auth = require('./routes/auth.js')
app.use('/', index)
app.use('/stories/', stories)
app.use('/auth/', auth)

// port設定
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started ${port}……`)
})
