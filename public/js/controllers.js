angular.module('phoneBookControllers', [])

	.controller('UsersController', ['$scope', function ($scope) {
		$scope.users = [];
	}])

	.controller('NavBase', ['$scope', '$http', 'Depat', function ($scope, $http, Depat) {
		var prevItim = {};

		Depat.get()
			.success(function (data) {
				$scope.navBar = data;
				prevItim = $scope.navBar[0];
			});

		var users = 'home';

		Depat.query(users)
			.success(function (data) {
				$scope.isPerson = false;
				$scope.users = data;
			});

		$scope.isUsers = function (navItim) {
			if (navItim.users) {
				prevItim.check = false;

				Depat.query(navItim.cn)
					.success(function (data) {
						$scope.users = data;
						navItim.check = true;
						$scope.isPerson = true;

						if (navItim.cn == 'home')
							$scope.isPerson = false;
					});
				prevItim = navItim;
			} else {
				navItim.show = !navItim.show;
			}
		}
	}])

	.controller('UsersTableBase', ['$scope', '$http', 'Users',
		function ($scope, $http, Users) {
			$scope.Clicable = function(user, isPerson) {
				if (isPerson) {
					user.show = !user.show;
				}
			}
		}]
);