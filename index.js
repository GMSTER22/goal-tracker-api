const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/index');
const mongoDb = require('./src/database/database');
const router = require('./src/routes/index');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

require('./src/config/passport')(passport);

const PORT = config.port || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

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
    store: new MongoStore({ uri: config.databaseURL, collection: 'sessions' })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/auth', require('./src/routes/auth'));
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error!');
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
mongoDb.initDb((err, _) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  }
});

module.exports = app;
