angular.module('db').factory('dbPhotos', function($http, dbApis) {

  var dbPhotos = {
    get: function() {
      return $http
        .get(dbApis.photos)
        .then(function(res) {
          return res.data;
        });
    }
  };

  return dbPhotos;
});