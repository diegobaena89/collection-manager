const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

// models
const Collection = require('./models/Collection');
const User = require('./models/User');

// import routes
const collectionRoutes = require('./routes/collectionsRoutes');
const authRoutes = require('./routes/authRoutes');

//import controller
const CollectionControler = require('./controllers/CollectionControler');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// session middleware
app.use(
  session({
    name: 'session',
    secret: 'our_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  }),
);

// flash messages
app.use(flash());

// public path
app.use(express.static('public'));

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

// routers
app.use('/collections', collectionRoutes);
app.use('/', authRoutes);

app.get('/', CollectionControler.showCollections);

app.get('/registrar', (req, res) => {
  res.render('registrar');
});

app.get('/', (req, res) => {
  res.render('home');
});

conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
