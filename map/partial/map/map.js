angular.module('map')
  .controller('MapCtrl',
    function($scope,
      $window,
      $q,
      dbMembers,
      dbTail,
      HtmlIcon,
      leafletData,
      htmlChunk) {

      var L = $window.L;
      var map = null;
      var popupTwit = L.popup({
        offset: [0, -18]
      });
      popupTwit.setContent(htmlChunk($scope, '<twit-card class="in-popup" media="tail[0]"></twit-card>'));

      var popupMember = L.popup({
        offset: [0, -18]
      });
      popupMember.setContent(htmlChunk($scope, '<member-card class="in-popup" member="currentMember"></member-card>'));


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

      function populateMarkersFromMembers(memberItems) {
        markersByScreenName = {};

        var markers = _(memberItems).filter(function(member) {
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
          // mrk.bindPopup(member.name);
          mrk.on('click', function() {
            $scope.$apply(function() {
              showPopupMember(mrk, member);
            });
          });

          markersByScreenName[member.screen_name] = mrk;

          return mrk;

        }).value();

        for (var i = 0; i < markers.length; i++) {
          var m = markers[i];
          m.addTo(map);
        }
      }

      function init() {
        dbMembers.get().then(function(memberItems) {
          memberItems = _(memberItems).sortBy('followers_count').values();
          populateMarkersFromMembers(memberItems);
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
        showPopupTwit(mrk, twit);
      }

      function showPopupTwit(mrk, twit) {
        popupTwit.setLatLng(mrk.getLatLng());
        popupTwit.openOn(map);
        popupTwit.update();
      }

      function showPopupMember(mrk, member) {
        $scope.currentMember = member;
        popupMember.setLatLng(mrk.getLatLng());
        popupMember.openOn(map);
        popupTwit.update();
      }

    });