angular.module('feed').controller('PhotoCtrl', function($scope, dbPhotoTail) {
  angular.extend($scope, {
    photos: dbPhotoTail.data
  });


  // function init() {
  //   // angular.copy(dbPhotoTail.data)
  //   // $scope.$on('db:stream:photo', onPhoto);

  // }

  // function onPhoto(event, data) {
  //   $scope.safeApply(function() {
  //     $scope.photos.push(data);
  //   });
  // }

  // init();
});