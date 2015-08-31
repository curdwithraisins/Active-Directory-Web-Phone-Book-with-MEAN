var mongoose = require('mongoose');
var Hometest = require('./app/models/home');
var database = require('./config/database');
var peoples = require('./config/people');

// configuration =====================================================
mongoose.connect(database.url);

Hometest.remove().exec();

peoples.forEach(function (people) {
    Hometest.create({
        displayName: people.displayName,
        physicalDeliveryOfficeName: people.physicalDeliveryOfficeName,
        telephoneNumber: people.telephoneNumber
    }, function (err) {
        if (err) console.log(err);
    });
});

mongoose.connection.close();
