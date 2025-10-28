(function(){
    'use strict';

    angular.module('todoApp')
        .controller('MainController', ['$scope', 'todoStorage', '$route', '$location', function($scope, todoStorage, $route, $location){

            $scope.tasks = todoStorage.load();

            $scope.newTask = {
                title: '',
                description: ''
            };

            $scope.currentFilter = ($route.current && $route.current.filterMode) ? $route.current.filterMode : 'all';

            function syncFilterFromRoute() {
                if ($route.current && $route.current.filterMode) {
                    $scope.currentFilter = $route.current.filterMode;
                } else {
                    $scope.currentFilter = 'all';
                }
            }

            syncFilterFromRoute();

            $scope.$on('$routeChangeSuccess', function(){
                syncFilterFromRoute();
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
                $location.path('/all');
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

            $scope.reorderTasks = function(fromIndex, toIndex){
                if (fromIndex === toIndex) { return; }

                var moved = $scope.tasks.splice(fromIndex, 1)[0];
                $scope.tasks.splice(toIndex, 0, moved);

                // if you need to persist order, call persist() here
                persist();
            };


            $scope.filteredTasks = function () {
                if ($scope.currentFilter === 'active') {
                    return $scope.tasks.filter(function (t) { return !t.completed; });
                }

                if ($scope.currentFilter === 'completed') {
                    return $scope.tasks.filter(function (t) { return t.completed; });
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

            $scope.getAllCount = function(){
                return $scope.tasks.length;
            };

            $scope.getActiveCount = function(){
                return $scope.tasks.filter(function(t){ return !t.completed; }).length;
            };

            $scope.getCompletedCount = function(){
                return $scope.tasks.filter(function(t){ return t.completed; }).length;
            };

// returns which tab is selected based on current route
            $scope.isView = function(route){
                return $location.path() === route;
            };

// change the active view
            $scope.setView = function(route){
                $location.path(route);
            };

            $scope.getEmptyMessage = function () {
                var route = $location.path();

                if (route === '/active') {
                    return "All tasks are completed — great job staying organized! 🎉";
                }

                if (route === '/completed') {
                    return "You haven’t completed any tasks yet. Keep going — you’ll get there! 💪";
                }

                // default = /all (or anything unexpected)
                return "Your to-do list is empty. Add a new task to get started ✍️";
            };


        }]);
})();
