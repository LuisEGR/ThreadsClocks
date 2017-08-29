clockApp.controller("clockController", ["$scope", "$interval", "$mdpTimePicker", "$timeout", function($scope, $interval, $mdpTimePicker, $timeout){
  var socket;
  $scope.timeClock = [];

  //Conexión con el servidor
  $scope.connect = function(address){
    if(!address) address = 'http://127.0.0.1:3000';
    socket = io.connect(address);
  }

  $scope.editTime = function(ev, numClock){
    console.log($scope.timeClock[numClock]);
    $mdpTimePicker($scope.timeClock[numClock], {
      targetEvent: ev
    }).then(function(selectedDate) {
      console.log(selectedDate);
      socket.emit('newTime',{
        id:numClock,
        time:moment(selectedDate)
      });
    });
  }

  $scope.connect();
  socket.on('connect', function(data) {
      console.log("Conectado con el Backend");
  });

  socket.on('updateTime', function (relojes) {
      relojes.forEach(function(r, idx){
        $timeout(function(){
          $scope.timeClock[idx] = moment(r).format("HH:mm:ss");
        });
      });
      console.log("UpdateTimeReceived", $scope.timeClock);
  });

  socket.on('disconnect', function () {
    console.log("Desconectado del Backend");
  });



}]);
