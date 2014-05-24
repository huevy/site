angular.module('page').controller('PageCtrl',
  function($scope, $stateParams, dbPage) {
    dbPage.get($stateParams.id).then(function(page) {
      $scope.text = page;
    });
  }
);