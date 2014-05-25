angular.module('db').factory('dbStream',
  function($window, $q, $rootScope, dbApis) {

    function listen() {
      var sock = $window.io.connect(dbApis.socket, {
        transports: ['xhr-polling']
      });
      sock.on('twit', function(data) {
        console.log('twit', data);
        $rootScope.$broadcast('db:stream:twit', data);
        $rootScope.$broadcast('db:stream:twit:' + data.screenName, data);
      });
    }


    var stream = {
      init: function() {
        listen();
      }
    };
    return stream;
  });