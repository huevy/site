angular.module('feed', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('feed').config(function($stateProvider) {

    $stateProvider.state('photo', {
        url: '/photo',
        templateUrl: 'feed/partial/photo/photo.html'
    });
    /* Add New States Above */

});

