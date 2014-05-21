angular.module('db').factory('dbStream',
  function($window, $q, $rootScope, streamConfig) {
    var head = $window.head;


    function listen() {
      var sock = $window.io.connect(streamConfig.socket, {
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

angular.module('db').constant('streamConfig', {
  socket: 'http://huevy-socket.herokuapp.com:80/'
});