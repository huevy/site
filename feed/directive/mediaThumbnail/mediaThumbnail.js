angular.module('feed').directive('mediaThumbnail', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      twit: '=',
      photo: '='
    },
    templateUrl: 'feed/directive/mediaThumbnail/mediaThumbnail.html',
    link: function(scope, element, attrs, fn) {


    }
  };
});