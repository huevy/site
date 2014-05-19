angular.module('db')
  .factory('profiles',
    function($q, $http) {

      function index(res) {
        var data = res.data;
        var result = {};

        result.items = data;
        result.byScreenName = _(data).indexBy('screen_name').value();

        return result;
      }


      var profiles = {
        get: function() {
          return $http.get('/data/users.json').then(index);
        }
      };

      return profiles;
    });