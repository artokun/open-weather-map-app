angular.module('OWMApp', ['ngRoute'])
  .value('owmCities', ['New York', 'Dallas', 'Chicago'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/cities/:city', {
        templateUrl: 'city.html',
        controller: 'CityController',
        resolve: {
          city: function (owmCities, $route, $location) {
            var city = $route.current.params.city;
            if (owmCities.indexOf(city) == -1) {
              $location.path('/error');
              return;
            }
            return city;
          }
        }
      })
      .when('/error', {
        templateUrl: '<p>Error - Page Not Found</p>'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('HomeController', function ($scope) {

  })
  .controller('CityController', function ($scope, city) {
    $scope.city = city;
    
  });