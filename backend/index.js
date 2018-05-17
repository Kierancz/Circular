/* eslint-disable no-console */
const dotenv = require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const localAuthRoutes = require('./routes/localAuthRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth/', localAuthRoutes);
require('./routes/authRoutes')(app);
require('./routes/campaignRoutes')(app);
require('./routes/signatureRoutes')(app);
require('./routes/commentRoutes')(app);
require('./routes/wasteProviderRoutes')(app);

if (process.env.NODE_ENV === 'dev') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Server is starting on port: ${PORT}`);
});

console.log(('NODE_ENV :', process.env.NODE_ENV));
