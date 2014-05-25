angular.module('db').factory('dbTwits', function($http, dbApis) {

  var dbTwits = {
    get: function() {
      return $http
        .get(dbApis.twits)
        .then(function(res) {
          return res.data;
        });
    }
  };

  return dbTwits;
});