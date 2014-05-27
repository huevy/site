angular.module('db').factory('dbApis', function($location) {

  var hubServer = 'http://huevy-socket.herokuapp.com:80';
  var staticData = '/data';

  var dbApis = {
    socket: hubServer + '/',
    twits: hubServer + '/api/v1/twits',
    photos: hubServer + '/api/v1/photos',
    top: hubServer + '/api/v1/top',
    users: staticData + '/users.json',
    locations: staticData + '/locations.json',
    geo: staticData + '/geo.json'
  };

  return dbApis;
});