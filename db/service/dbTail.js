angular.module('db').factory('dbTail', function($rootScope, members) {

  var dbTail = {
    data: [],
    init: function() {
      $rootScope.$on('db:stream:twit', onTwit.bind(this));
    }
  };

  function onTwit(event, twit) {
    this.data.push({
      twit: twit
    });
  }

  return dbTail;
});