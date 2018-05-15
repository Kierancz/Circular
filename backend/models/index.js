/* eslint-disable no-console */
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('./User');
require('./Campaign');
require('./Signature');
require('./Comment');
require('./WasteProvider');
require('../services/passport');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test') {
  const MongoInMemory = require('mongo-in-memory');

  var port = 8000;
  var mongoServerInstance = new MongoInMemory(port); //DEFAULT PORT is 27017

  mongoServerInstance.start((error, config) => {
    if (error) {
      console.error(error);
    } else {
      //callback when server has started successfully
      console.log('HOST ' + config.host);
      console.log('PORT ' + config.port);

      var mongouri = mongoServerInstance.getMongouri('myDatabaseName');
      mongoose.connect(mongouri);
    }
  });
} else {
  mongoose.connect(keys.mongoURI, {
    keepAlive: true,
    useMongoClient: true
  });
}

module.exports.User = require('./User');
