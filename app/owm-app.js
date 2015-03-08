angular.module('OWMApp', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/cities/:city', {
        templateUrl: 'city.html',
        controller: 'CityController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('HomeController', ['$scope', function ($scope) {

  }])
  .controller('CityController',['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.city = $routeParams.city;
  }]);