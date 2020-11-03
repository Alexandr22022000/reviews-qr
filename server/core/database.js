const mongoose = require('mongoose'),
    session = require('express-session'),
    mongoConnect = require('connect-mongo'),
    {consoleLog} = require('./logs');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/reviews_qr';

const config = { //FIXME check settings
    sessionOptions: {
        secret:             'Neuronex secret',
        resave:             false,
        saveUninitialized:  false,
        duration:           30*60*1000,
        activeDuration:     5*60*1000
    },
    mongooseOptions: {
        useNewUrlParser: true,
    },
};

exports.init = (app) => {
    let dbName = DATABASE_URL.slice(DATABASE_URL.lastIndexOf('/') + 1); //FIXME add regexp
    if (dbName.indexOf('?') !== -1) {
        dbName = dbName.slice(0, dbName.indexOf('?') + 1);
    }

    const mongoStore = mongoConnect(session);
    config.sessionOptions.name = dbName;
    config.sessionOptions.store = new mongoStore({url: DATABASE_URL});
    app.use(session(config.sessionOptions));

    mongoose.connect(DATABASE_URL, config.mongooseOptions); //FIXME check warning msg

    mongoose.connection.on('error', () => consoleLog("Error: no database connection!"));
};
