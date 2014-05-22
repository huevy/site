angular.module('db').factory('dbFakeStream', function($interval, $rootScope, dbMembers) {


  function emulate(memberItems) {
    var len = memberItems.length;
    var i = Math.floor(Math.random() * len);
    var member = memberItems[i];
    var twit = {
      text: 'Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, ',
      createdAt: new Date(),
      name: member.name,
      screenName: member.screen_name
    };
    $rootScope.$broadcast('db:stream:twit', twit);
  }


  var dbFakeStream = {
    init: function() {
      dbMembers.get().then(function(mem) {
        $interval(emulate.bind(null, mem), 1300);
      });
    }
  };

  return dbFakeStream;
});