angular.module('page', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'btford.markdown']);

angular.module('page').config(function($stateProvider) {

  $stateProvider.state('page', {
    url: '/page/:id',
    templateUrl: 'page/partial/page/page.html'
  });
  /* Add New States Above */

});