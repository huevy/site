angular.module('huyovy').directive('twitStrip', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      items: '='
    },
    templateUrl: 'directive/twitStrip/twitStrip.html',
    link: function(scope, element, attrs, fn) {


    }
  };
});