angular.module('map').factory('HtmlIcon', function($window, $compile) {

  var L = $window.L;

  var htmlIcon = L.Icon.extend({
    options: {
      /*
    scope: (Scope) (required)
    html: (String) (required)
    iconAnchor: (Point)
    popupAnchor: (Point)
    */
    },

    initialize: function(options) {
      L.Util.setOptions(this, options);
    },

    createIcon: function() {
      var div = document.createElement('div');
      div.innerHTML = this.options.html;
      var dom = $compile(div)(this.options.scope);
      return dom[0];
    },

    createShadow: function() {
      return null;
    }
  });


  return htmlIcon;
});