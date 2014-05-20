angular.module('map').directive('marker', function($interval, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      member: '='
    },
    templateUrl: 'map/directive/marker/marker.html',
    link: function(scope, element, attrs, fn) {
      var img = $(element).find('img');

      img.tooltip({
        container: 'body',
        placement: 'right'
      });

      $interval(function() {
        if (Math.random() < 0.1) {

          img.tooltip('show');
          $timeout(function() {
            img.tooltip('hide');
          }, 1000);
        }
      }, 2000);
    }
  };
});