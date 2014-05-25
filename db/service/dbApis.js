angular.module('db').factory('dbApis', function($location) {

  var hubServer = 'http://huevy-socket.herokuapp.com:80';
  var staticData = 'http://huevy.github.io/data';

  if ($location.host() === '127.0.0.1') {
    staticData = '/data';
  }

  var dbApis = {
    socket: hubServer + '/',
    twits: hubServer + '/api/v1/twits',
    top: hubServer + '/api/v1/top',
    users: staticData + '/users.json',
    locations: staticData + '/locations.json',
    geo: staticData + '/geo.json'
  };

  return dbApis;
});