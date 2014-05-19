angular.module('map', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'leaflet-directive']);

angular.module('map').config(function($stateProvider) {

  $stateProvider.state('map', {
    url: '/',
    templateUrl: 'map/partial/map/map.html'
  });
  /* Add New States Above */

});