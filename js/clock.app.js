var clockApp = angular.module("Clock", ['ngMaterial', 'mdPickers']);
clockApp.directive('clock', function(){
  return {
   restrict: 'E',
   template: '<div class="clock" >'+
     '{{actualTime.format("HH:mm:ss")}}'+
   '</div>'+
   '<br><md-button class="md-raised" ng-click="ctrl.showTimePicker($event)">Editar</md-button>'
  };
});
