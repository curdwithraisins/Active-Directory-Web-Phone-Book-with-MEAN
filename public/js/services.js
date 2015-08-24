angular.module('phoneBookServices', [])

	.factory('Users', ['$http',	function($http) {
		return {
			get: function (id) {
				return $http.get('/users/' + id);
			}
		}
	}])

	.factory('Depat', ['$http',	function($http){
		return {
			get : function() {
				return $http.get('/depat/');
			},
			query : function(cn) {
					return $http.get('/depat/' + cn);
				}
			}
	}]);
