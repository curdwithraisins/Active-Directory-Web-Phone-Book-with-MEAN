var ActiveDirectory = require('activedirectory');
var config = require('../../config/connect');
var _ = require('underscore');

var ActiveDirBase = function() {
    this.ad = new ActiveDirectory(config);
};

function FindIndex (navBar, group, pos) {
    for (var i = 0; i < navBar.length; i++) {
        if (navBar[i].name == group.path[pos]) {
            FindIndex(navBar[i].sub, group, ++pos);
            return;
        }
    }
    AddNav(navBar, group, pos);
    return;
};

function AddNav(navBar, group, pos) {
    navBar[navBar.length] = {
        'name': group.path[pos],
        'cn': group.cn,
        'sub': [],
        'show': false,
        'users': false,
        'check': false
    };
    if (group.path[++pos] != null)
        AddNav(navBar[navBar.length - 1].sub, group, pos);
    else
        navBar[navBar.length - 1].users = true;
    return;
};

ActiveDirBase.prototype.findMenu = function findMenu(callback) {
    var navQuery = 'CN=*dl-dng-svc-dfs-*';

    this.ad.findGroups(navQuery, function(err, groups) {
        if (err) {
            console.log('ERROR: ' +JSON.stringify(err));
            if (callback) callback(err);
            return;
        }

        if ((! groups) || (groups.length == 0)) console.log('No groups found.');
        else {
            _.each(groups, function (group) {
                var split = group.dn.split(',');
                group.path = split.slice(2, split.length-4);
                group.path = group.path.reverse();
                group.path.forEach(function(itim, i, arr) {
                    arr[i] = itim.substring(3, itim.length);
                });
            });

            var newGroups = _.sortBy(groups, 'path');
            var navBar = [];

            navBar[navBar.length] = {
                'name': 'Home',
                'cn': 'home',
                'sub': [],
                'show': false,
                'users': true,
                'check': true
            };

            _.each(newGroups, function (group) {
                FindIndex(navBar, group, 0);
            });

            if (callback) callback(null, navBar);
        }
    });
};

ActiveDirBase.prototype.findMembers = function findMembers(cn, callback) {
    if (typeof(cn) === 'function') {
        callback = cn;
    }

    this.ad.getUsersForGroup(cn, function (err, users) {
        if (err) {
            console.log('ERROR: ' +JSON.stringify(err));
            if (callback) callback(err);
            return;
        }
        if (! users) console.log('Group: ' + groupName + ' not found.');
        else {
            if (callback) callback(null, users);
        }
    });
};

module.exports = ActiveDirBase;
