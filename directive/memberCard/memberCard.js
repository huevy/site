angular.module('huyovy').directive('memberCard', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      member: '='
    },
    templateUrl: 'directive/memberCard/memberCard.html',
    link: function(scope, element, attrs, fn) {


    }
  };
});