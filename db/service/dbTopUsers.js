angular.module('db').factory('dbTopUsers', function($http, $q, dbMembers) {


  var URL = 'http://huevy-socket.herokuapp.com/api/v1/top';

  function getTop(lim) {
    return $http.get(URL, {
      cache: true
    }).then(function(res) {
      return res.data;
    }).then(function(users) {
      return _(users).pairs().sortBy(function(_) {
        return -_[1];
      }).first(lim).pluck(0).value();
    });
  }


  var dbTopUsers = {
    get: function(lim) {
      return $q.all({
        members: dbMembers.get().then(function(mem) {
          return _(mem).indexBy('screen_name').value();
        }),
        top: getTop(lim)
      }).then(function(results) {
        return _(results.top).map(function(sName) {
          return results.members[sName];
        }).filter().value();
      });
    }

  };

  return dbTopUsers;
});