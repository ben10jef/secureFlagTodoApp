(function(){
 'use strict';

 angular.module('todoApp')
 .factory('todoStorage', ['$window', function($window){

    var STORAGE_KEY = 'todos-angularjs';

    function load(){
        var raw = $window.localStorage.getItem(STORAGE_KEY);
        if(!raw){
            return [];
        }
        try {
            return JSON.parse(raw);
        } catch(e){
            return [];
        }
    }

    function save(tasks){
        $window.localStorage.setItem(STORAGE_KEY, angular.toJson(tasks));
    }

    return {
        load: load,
        save: save
    };
 }]);
})();