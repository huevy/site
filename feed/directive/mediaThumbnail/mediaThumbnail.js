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
      var img = element.find('img');
      var w = element.width();
      var h = 0.75 * w;
      element.css('height', h);
    }
  };
});