clockApp.controller("clockController", ["$scope", "$interval", function($scope, $interval){
  $scope.actualTime = moment();

  $interval(function(){
    $scope.actualTime.subtract(1, 'seconds')
  }, 1000)

}]);
