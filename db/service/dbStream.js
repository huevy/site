angular.module('db').factory('dbStream',
  function($window, $q, $rootScope, dbApis) {

    function listen() {
      var sock = $window.io.connect(dbApis.socket, {
        transports: ['xhr-polling']
      });

      sock.on('twit', function(data) {
        $rootScope.$broadcast('db:stream:twit', data);
      });

      sock.on('media', function(data) {
        for (var i = 0; i < data.media.length; i++) {
          $rootScope.$broadcast('db:stream:photo', {
            twit: data.twit,
            photo: data.media[i]
          });
        }
      });
    }


    var stream = {
      init: function() {
        listen();
      }
    };
    return stream;
  });