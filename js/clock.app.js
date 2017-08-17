var clockApp = angular.module("Clock", ['ngMaterial']);
clockApp.directive('clock', function(){
  return {
   restrict: 'E',
   template: '<div class="clock" >'+
     '{{actualTime.format("HH:mm:ss")}}'+
   '</div>'+
   '<br><md-button class="md-raised">Editar</md-button>'
  };
});
