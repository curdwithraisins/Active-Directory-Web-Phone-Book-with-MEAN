angular.module('phoneBookControllers', [])

	.controller('UsersController', function () {

	})

	.controller('NavBase', function ($scope, $resource, Depat) {
		var prevItim = {};

		//for correct work with ActiveDirectory
		/*Depat.get()
			.success(function (data) {
				$scope.navBar = data;
				prevItim = $scope.navBar[0];
			});
			*/

		//for tests
		var NavResource = $resource('js/depat.json', {}, {
			getJSON: {method: 'GET', isArray: true}});
		NavResource.getJSON(function (data) {
			$scope.navBar = data;
			prevItim = data[0];
		});

		Depat.query('home')
			.success(function (data) {
				$scope.users = data;
				$scope.isPerson = true;
			});

		$scope.isUsers = function (navItim) {
			if (navItim.users) {
				prevItim.check = false;

				Depat.query(navItim.cn)
					.success(function (data) {
						$scope.users = data;
						$scope.isPerson = navItim.cn != 'home';
						navItim.check = true;
					});
				prevItim = navItim;
			} else {
				navItim.show = !navItim.show;
			}
		};
	})

	.controller('UsersTableBase', function ($scope, Users) {

		});