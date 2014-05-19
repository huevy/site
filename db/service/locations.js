angular.module('db').factory('locations', function($q, $http) {

  function parse(response) {
    var items = $.parse(response.data, {
      delimiter: ',',
      header: false
    }).results;

    return _(items).map(function(item) {
      return {
        screen_name: item[0],
        name: item[1],
        lat: item[2],
        lng: item[3]
      };
    }).value();
  }


  var locations = {
    get: function() {
      return $http.get('/data/location.csv').then(parse);
    }
  };

  return locations;
});