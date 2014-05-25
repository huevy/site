angular.module('map').controller('PeopleCtrl', function(
  $scope,
  $window,
  dbMembers,
  leafletData,
  htmlChunk,
  HtmlIcon


) {
  angular.extend($scope, {
    center: {
      lat: 49.306424,
      lng: 31.313245,
      zoom: 4
    },
    defaults: {
      scrollWheelZoom: true,
      tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    }
  });

  var L = $window.L;
  var map = null;
  var membersByPlace = {};

  leafletData.getMap('mapLeafletPeople').then(function(_map) {
    map = _map;
    init();
  });

  function init() {
    dbMembers.get().then(function(members) {
      $scope.members = _(members).sortBy(function(member) {
        return -member.followers_count;
      }).value();
      populateMarkersFromMembers(members);
    });
  }

  function populateMarkersFromMembers(memberItems) {
    // markersByScreenName = {};
    membersByPlace = {};

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


      mrk.on('click', function() {
        $scope.$apply(function() {
          showPopup(mrk, member.place);
        });
      });

      if (!membersByPlace[member.place]) {
        membersByPlace[member.place] = [];
      }
      membersByPlace[member.place].push(member);

      // markersByScreenName[member.screen_name] = mrk;

      return mrk;

    }).sortBy('followers_count').value();

    for (var i = 0; i < markers.length; i++) {
      var m = markers[i];
      m.addTo(map);
    }
  }

  function showPopup(mrk, place) {

    $scope.currentMembers = membersByPlace[place];
    popupMember.setLatLng(mrk.getLatLng());
    popupMember.openOn(map);
    popupMember.update();
  }

  var popupMember = L.popup({
    offset: [0, -18]
  });
  popupMember.setContent(htmlChunk($scope, '<member-card ng-repeat="_ in currentMembers" class="in-popup" member="_"></member-card>'));


});