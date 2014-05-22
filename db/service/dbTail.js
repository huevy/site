angular.module('db').factory('dbTail', function($rootScope, dbMembers) {
  var MAX_LEN = 100;

  var dbTail = {
    data: [],
    init: function() {
      dbMembers.get().then(function(memberItems) {
        this.members = _(memberItems).indexBy('screen_name').value();
        $rootScope.$on('db:stream:twit', onTwit.bind(this));
      }.bind(this));
    }
  };

  function onTwit(event, twit) {
    this.data.unshift({
      twit: twit,
      member: this.members[twit.screenName]
    });
    if (this.data.length > MAX_LEN) {
      this.data.pop();
    }
  }

  return dbTail;
});