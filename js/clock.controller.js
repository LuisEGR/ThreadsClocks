clockApp.controller("clockController", ["$scope", "$interval", "$mdpTimePicker", function($scope, $interval, $mdpTimePicker){
  $scope.timeClock = [moment(), moment(), moment(), moment()];
  $scope.totalClocks = Array(4);
  $interval(function(){
    $scope.timeClock[0].subtract(1, 'seconds');
  }, 1000);


  $scope.editTime = function(ev, numClock){
       console.log($scope.timeClock[numClock]);
    $mdpTimePicker($scope.timeClock[numClock], {
      targetEvent: ev
    }).then(function(selectedDate) {
      console.log(selectedDate);
      $scope.timeClock[numClock] = moment(selectedDate);
    });
  }

}]);
