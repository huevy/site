angular.module('db').factory('dbPage',
  function($http) {

    var dbPage = {
      get: function(id) {
        var url = ('/pages/' + id + '.md').replace(/\.\./g, '_');
        return $http.get(url)
          .then(function(res) {
            return res.data;
          });
      }
    };

    return dbPage;
  });