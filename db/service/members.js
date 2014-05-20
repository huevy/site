angular.module('db')
  .factory('members', function($q, $http) {


    function compose(collections) {
      var users = collections.shift();
      var locations = collections.shift();
      var geo = collections.shift();

      return _(users).map(function(user) {
        var newUser = _(user).pick([
          'screen_name',
          'name',
          'profile_image_url_https'
        ]).value();
        newUser.place = null;
        if (locations.hasOwnProperty(newUser.screen_name)) {
          newUser.place = locations[newUser.screen_name].location || null;
        }
        newUser.geo = null;
        if (newUser.place) {
          newUser.geo = geo[newUser.place] || null;
        }
        return newUser;
      }).value();

    }

    function getData(response) {
      return response.data;
    }

    var members = {
      get: function() {

        return $q.all([
          $http.get('/data/users.json', {
            cache: true
          }).then(getData),
          $http.get('/data/locations.json', {
            cache: true
          }).then(getData),
          $http.get('/data/geo.json', {
            cache: true
          }).then(getData)
        ]).then(compose);

      }
    };

    return members;
  });