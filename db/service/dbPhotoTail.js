angular.module('db').factory('dbPhotoTail', function($rootScope, $q, dbMembers, dbPhotos) {
  var MAX_LEN = 400;

  var dbPhotoTail = {
    data: [],
    init: function() {
      dbPhotos.get().then(function(photos) {
        for (var i = photos.length - 1; i >= 0; i--) {
          this.data.push(photos[i]);
        }
        $rootScope.$on('db:stream:photo', onPhoto.bind(this));
      }.bind(this));

    }
  };


  function onPhoto(event, photo) {
    $rootScope.safeApply(function() {
      dbPhotoTail.data.unshift(photo);
    });
  }

  return dbPhotoTail;
});