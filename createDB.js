/**
 * Created by irina.samsonova on 20.08.2015.
 */
var mongoose = require('mongoose');
var _ = require('underscore');
var database = require('./config/database'); 			// load the database config
var Hometest = require('./app/models/home');
var peoples = require('./config/people');

// configuration ===============================================================
mongoose.connect(database.url, function(err) {
    if (!err) {
        console.log('connection successful');
        debugger;
		Hometest.find().remove().exec();

        _.each(peoples, function (people) {
            Hometest.create({
                displayName: people.displayName,
                physicalDeliveryOfficeName: people.physicalDeliveryOfficeName,
                telephoneNumber: people.telephoneNumber
            }, function (err, todo) {
                if (err) console.log(err);
                else console.log(todo);
            });
        });

    } else {
        console.log('connection error', err);
    }
});