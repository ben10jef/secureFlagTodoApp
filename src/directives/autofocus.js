(function(){
 'use strict';

 // Small attribute directive to focus+select an input when it appears.
 // This is DOM manipulation in link(), which is part of the assignment.
 angular.module('todoApp')
 .directive('todoAutofocus', [function(){
    return {
       restrict: 'A',
       link: function(scope, element){
          // use timeout so it runs after DOM is in place
          setTimeout(function(){
             element[0].focus();
             if (element[0].select) {
               element[0].select();
             }
          }, 0);
       }
    };
 }]);
})();