var Hometest = require('./models/home');
var ActiveDirBase = require('./active-directory/active-dir');

var ActiveDir = new ActiveDirBase();

function getHomeUsers(res) {

	Hometest.find().sort({_id: 1}).exec(function (err, data) {
		if (err) return res.send(err);
		res.json(data);
	});

};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	app.get('/depat/:cn_id', function(req, res) {

		var cn_id = req.params.cn_id;
		if (cn_id == 'home') {
			getHomeUsers(res);
		} else {
			ActiveDir.findMembers(cn_id, function (err, data) {
				if (err) return console.log(err);
				res.json(data);
			});
		}

	});

	app.get('/depat/', function(req, res) {

		ActiveDir.findMenu(function (err, data) {
			if (err) return console.log(err);
			res.json(data);
		});
	});

	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
};