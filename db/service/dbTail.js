angular.module('db').factory('dbTail', function($rootScope, $q, dbMembers, dbTwits) {
  var MAX_LEN = 100;

  var dbTail = {
    data: [],
    init: function() {

      $q.all([
        dbMembers.get(),
        dbTwits.get()
      ]).then(function(results) {
        var members = results.shift();
        var twits = results.shift() || [];

        this.members = _(members).indexBy('screen_name').value();

        for (var i = twits.length - 1; i >= 0; i--) {
          this.data.push(new Media(twits[i], this.members));
        }

        $rootScope.$on('db:stream:twit', onTwit.bind(this));
      }.bind(this));

    }
  };

  function Media(twit, members) {
    this.twit = twit;
    this.member = members[twit.screenName];
  }

  function onTwit(event, twit) {
    this.data.unshift(new Media(twit, this.members));

    if (this.data.length > MAX_LEN) {
      this.data.pop();
    }
  }

  return dbTail;
});