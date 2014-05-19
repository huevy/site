angular.module('db').factory('stream',
  function($window, $q, $rootScope, streamConfig) {
    var head = $window.head;

    function loadClient() {
      var def = $q.defer();

      head.load(streamConfig.client, function() {
        def.resolve($window.io);
      });
      return def.promise;
    }

    function connect(io) {
      return io.connect(streamConfig.socket);
    }

    function listen(sock) {
      sock.on('twit', function(data) {
        console.log('twit', data);
        $rootScope.$broadcast('db:stream:twit', data);
      });
    }


    var stream = {
      init: function() {
        loadClient()
          .then(connect)
          .then(listen);
      }
    };
    return stream;
  });

angular.module('db').constant('streamConfig', {
  socket: 'http://huevy-socket.herokuapp.com:80/',
  client: 'http://huevy-socket.herokuapp.com/socket.io/socket.io.js'
});