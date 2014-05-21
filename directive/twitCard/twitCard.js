angular.module('huyovy').directive('twitCard', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      media: '='
    },
    templateUrl: 'directive/twitCard/twitCard.html',
    link: function(scope, element, attrs, fn) {


    }
  };
});