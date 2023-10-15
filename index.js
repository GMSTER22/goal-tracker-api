const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/index');
const mongoDb = require('./src/database/database');
const router = require('./src/routes/index');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
require('./src/config/passport')(passport);

const PORT = config.port || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error!');
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*'
  });
  res.header({
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  });
  res.header({
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  });

  next();
});

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ uri: process.env.MONGO_URI, collection: 'sessions' })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/auth', require('./src/routes/auth'));

// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
mongoDb.initDb((err, _) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  }
});
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: process.env.CALLBACK_URL
//     },
//     function (accessToken, refreshToken, profile, done) {
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true
//   })
// );

// app.use(passport.initialize());

// app.use(passport.session());
