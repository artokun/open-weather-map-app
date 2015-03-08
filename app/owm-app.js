angular.module('OWMApp', ['ngRoute'])
  .value('owmCities', ['New York', 'Dallas', 'Chicago'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController as home'
      })
      .when('/cities/:city', {
        templateUrl: 'city.html',
        controller: 'CityController as city',
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
        template: '<p>Error - Page Not Found</p>'
      })
      /*.run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function () {
          $location.path('/error');
        });
      })//Where do I put this??*/
      .otherwise('/error');
  }])
  .controller('HomeController', function ($scope) {
    this.welcomeMessage = "Welcome Home";
  })
  .controller('CityController', function ($scope, city) {
    $scope.city = city;

  });