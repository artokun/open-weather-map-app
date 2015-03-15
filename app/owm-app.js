/*global angular */
angular.module('OWMApp', ['ngRoute'])
  .value('owmCities', ['New York', 'Dallas', 'Chicago'])
  .config(['$routeProvider', function ($routeProvider) {
    "use strict";
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
            if (owmCities.indexOf(city) === -1) {
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
      .otherwise('/error');
  }])
  .run(function ($rootScope, $location) {
    "use strict";
    $rootScope.$on('$routeChangeError', function () {
      $location.path('/error');
    });//not needed with .otherwise but good to know for later
  })
  .controller('HomeController', function () {
    "use strict";
    this.welcomeMessage = "Welcome Home";
  })
  .controller('CityController', function (city) {
    "use strict";
    this.city = city;
  });