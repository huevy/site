angular.module('feed').controller('PhotoCtrl', function($scope) {
  angular.extend($scope, {
    photos: []
  });


  function init() {
    $scope.$on('db:stream:photo', onPhoto);
  }

  function onPhoto(event, data) {
    $scope.safeApply(function() {
      $scope.photos.push(data);
    });
  }

  init();
});