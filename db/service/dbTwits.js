angular.module('db').factory('dbTwits', function($http) {

  var URL = 'http://huevy-socket.herokuapp.com/api/v1/twits';

  var dbTwits = {
    get: function() {
      return $http.get(URL).then(function(res) {
        return res.data;
      });
    }
  };

  return dbTwits;
});