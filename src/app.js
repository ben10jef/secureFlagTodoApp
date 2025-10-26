(function(){
 'use strict';

 angular.module('todoApp', ['ngRoute'])
 .config(['$routeProvider', function($routeProvider){
     $routeProvider
      .when('/', {
          templateUrl: 'templates/todoList.html',
          controller: 'MainController',
          filterMode: 'all'
      })
      .when('/active', {
          templateUrl: 'templates/todoList.html',
          controller: 'MainController',
          filterMode: 'active'
      })
      .when('/completed', {
          templateUrl: 'templates/todoList.html',
          controller: 'MainController',
          filterMode: 'completed'
      })
      .otherwise({redirectTo:'/'});
 }]);
})();