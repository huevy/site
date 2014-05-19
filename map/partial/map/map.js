angular.module('map')
  .controller('MapCtrl',
    function($scope,
      $window,
      $q,
      locations,
      profiles,
      members,
      htmlIcon,
      leafletData) {
      var HtmlIcon = htmlIcon;

      var map = null;
      var L = $window.L;

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
        var markers = _(members).filter(function(member) {
          return !!member.geo;
        }).map(function(member) {
          var avatar = member.profile_image_url_https;
          var mrk = new L.Marker([member.geo.lat, member.geo.lng], {
            icon: new HtmlIcon({
              html: '<div style="background:white;color:red;">' + member.name + '</div>'
            })
          });
          mrk.bindPopup(member.name);
          return mrk;

        }).value();

        for (var i = 0; i < markers.length; i++) {
          var m = markers[i];
          m.addTo(map);
        }
      }

      function init() {
        members.get().then(populateMarkersFromMembers);
      }

    });