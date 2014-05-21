angular.module('huyovy', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'map', 'db']);

angular.module('huyovy').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('huyovy').run(function(dbStream) {
    dbStream.init();
});
// angular.module('huyovy').run(function(dbFakeStream) {
//     dbFakeStream.init();
// });

angular.module('huyovy').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});