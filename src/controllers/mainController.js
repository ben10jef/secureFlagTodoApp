(function(){
    'use strict';

    angular.module('todoApp')
        .controller('MainController', ['$scope', 'todoStorage', '$route', function($scope, todoStorage, $route){

            $scope.tasks = todoStorage.load();

            $scope.newTask = {
                title: '',
                description: ''
            };

            $scope.currentFilter = ($route.current && $route.current.filterMode) ? $route.current.filterMode : 'all';

            $scope.$on('$routeChangeSuccess', function(){
                $scope.currentFilter = $route.current.filterMode || 'all';
            });

            // internal helper to persist to localStorage
            function persist(){
                todoStorage.save($scope.tasks);
            }

            // expose persistence so directive can call it after edit
            $scope.persistAfterEdit = function(){
                persist();
            };

            $scope.addTask = function(){
                if(!$scope.newTask.title){ return; }

                $scope.tasks.push({
                    id: Date.now(),
                    title: $scope.newTask.title.trim(),
                    description: $scope.newTask.description ? $scope.newTask.description.trim() : '',
                    completed: false
                });

                $scope.newTask = { title: '', description: '' };

                persist();
            };

            // keyboard: Enter to add
            $scope.handleAddKey = function($event){
                if ($event.key === 'Enter'){
                    $scope.addTask();
                }
            };

            // Toggle completed
            // IMPORTANT: the checkbox in the directive already updated task.completed.
            // We just save to localStorage. We DO NOT flip it again here.
            $scope.toggleTask = function(task){
                persist();
            };

            $scope.deleteTask = function(task){
                var idx = $scope.tasks.indexOf(task);
                if(idx > -1){
                    $scope.tasks.splice(idx, 1);
                    persist();
                }
            };

            $scope.moveUp = function(index){
                if(index <= 0){ return; }
                var tmp = $scope.tasks[index - 1];
                $scope.tasks[index - 1] = $scope.tasks[index];
                $scope.tasks[index] = tmp;
                persist();
            };

            $scope.moveDown = function(index){
                if(index >= $scope.tasks.length - 1){ return; }
                var tmp = $scope.tasks[index + 1];
                $scope.tasks[index + 1] = $scope.tasks[index];
                $scope.tasks[index] = tmp;
                persist();
            };

            $scope.filteredTasks = function(){
                if($scope.currentFilter === 'active'){
                    return $scope.tasks.filter(function(t){ return !t.completed; });
                }
                if($scope.currentFilter === 'completed'){
                    return $scope.tasks.filter(function(t){ return t.completed; });
                }
                return $scope.tasks;
            };

            $scope.clearCompleted = function(){
                $scope.tasks = $scope.tasks.filter(function(t){
                    return !t.completed;
                });
                persist();
            };

            $scope.completedCount = function () {
                return $scope.tasks.filter(function (t) {
                    return t.completed;
                }).length;
            };
        }]);
})();
