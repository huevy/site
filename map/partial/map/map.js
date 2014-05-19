angular.module('map')
  .controller('MapCtrl',
    function($scope, $q, locations, profiles) {
      angular.extend($scope, {
        center: {
          lat: 49.306424,
          lng: 31.313245,
          zoom: 4
        },
        defaults: {
          scrollWheelZoom: true,
          tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        },
        markers: []
      });

      function populateMarkers(locs, profs) {
        $scope.markers = _(locs).map(function(loc) {
          var user = profs.byScreenName[loc.screen_name] || {};
          var avatar = user.avatar;

          return {
            lat: loc.lat,
            lng: loc.lng,
            message: loc.name,
            draggable: true,
            icon: {
              iconSize: [48, 48],
              iconUrl: avatar
            },
            $id$: loc.screen_name
          };
        }).indexBy('$id$').value();
      }

      function init() {
        $q.all({
          profiles: profiles.get(),
          locations: locations.get()
        }).then(function(res) {
          populateMarkers(res.locations, res.profiles);
        });
      }

      init();
    });