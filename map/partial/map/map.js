angular.module('map')
  .controller('MapCtrl',
    function($scope,
      $window,
      $q,
      locations,
      profiles,
      members,
      dbTail,
      HtmlIcon,
      leafletData) {

      var L = $window.L;
      var map = null;
      var baloon = L.popup({
        offset: [0, -20]
      });
      var markersByScreenName = {};

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

      leafletData.getMap('mapLeafletMain').then(function(_map) {
        map = _map;
        init();
      });

      function populateMarkersFromMembers(members) {
        markersByScreenName = {};

        var markers = _(members).filter(function(member) {
          return !!member.geo;
        }).map(function(member) {
          var scope = $scope.$new();
          scope.member = member;
          var mrk = new L.Marker([member.geo.lat, member.geo.lng], {
            icon: new HtmlIcon({
              scope: scope,
              html: '<div style="position:absolute;"><marker member="member"></marker></div>',
            })
          });
          mrk.bindPopup(member.name);

          markersByScreenName[member.screen_name] = mrk;

          return mrk;

        }).value();

        for (var i = 0; i < markers.length; i++) {
          var m = markers[i];
          m.addTo(map);
        }
      }

      function init() {
        members.get().then(function(members) {
          populateMarkersFromMembers(members);
          dbTail.init();
          $scope.tail = dbTail.data;
        });
        $scope.$on('db:stream:twit', onTwit);
        $scope.$watchCollection('tail', function() {
          console.log($scope.tail);
        });
      }

      function onTwit(event, twit) {
        var sName = twit.screenName;
        var mrk = markersByScreenName[sName];
        if (!mrk) {
          return;
        }
        showBaloon(mrk, twit);
      }

      function showBaloon(mrk, twit) {
        baloon.setContent(twit.text); //TODO: XSS!
        baloon.setLatLng(mrk.getLatLng());
        baloon.openOn(map);
      }

    });