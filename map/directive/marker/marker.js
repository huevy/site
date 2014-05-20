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



      // function onTwit(event, twit) {
      //   console.log('member twit', twit.text);
      //   img.tooltip({
      //     placement: 'right',
      //     title: twit.text
      //   });
      //   img.tooltip('show');
      //   $timeout(function() {
      //     img.tooltip('hide');
      //     img.tooltip('destroy');
      //   }, 10000);
      // }

      // scope.$on('db:stream:twit:' + scope.member.screen_name, onTwit);
    }
  };
});