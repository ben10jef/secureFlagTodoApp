(function(){
    'use strict';

    angular.module('todoApp')
        .directive('todoItem', [function(){
            return {
                restrict: 'E',
                scope: {
                    todo: '=',
                    index: '=',
                    totalCount: '=',
                    onToggle: '&',
                    onDelete: '&',
                    onMoveUp: '&',
                    onMoveDown: '&',
                    onSave: '&'
                },
                template:
                    '<div class="todo-item" ' +
                    'ng-class="{ \'done\': todo.completed, \'pending\': !todo.completed }">' +

                    '<div class="todo-left form-check pt-1">' +
                    '<input type="checkbox" class="form-check-input" ' +
                    'ng-model="todo.completed" ng-change="toggle()" />' +
                    '</div>' +

                    '<div class="todo-row-main">' +

                    '<div class="todo-main" ng-if="!isEditing">' +
                    '<div class="todo-title">{{todo.title}}</div>' +
                    '<div class="todo-desc text-secondary small" ng-if="todo.description">{{todo.description}}</div>' +
                    '</div>' +

                    '<div class="todo-edit bg-light border rounded p-3 w-100" ng-if="isEditing">' +

                    '<div class="mb-3">' +
                    '<label class="form-label">Title *</label>' +
                    '<input type="text" class="form-control form-control-sm" ' +
                    'ng-model="editModel.title" todo-autofocus ' +
                    'ng-keydown="handleEditKeys($event)" required />' +
                    '</div>' +

                    '<div class="mb-3">' +
                    '<label class="form-label">Description</label>' +
                    '<textarea class="form-control form-control-sm" rows="3" ' +
                    'ng-model="editModel.description" ' +
                    'ng-keydown="handleEditKeys($event)"></textarea>' +
                    '</div>' +

                    '<div class="d-flex flex-wrap gap-2 edit-actions">' +
                    '<button class="btn btn-success btn-sm d-flex align-items-center" ng-click="saveEdit()">' +
                    '<i class="bi bi-save me-1"></i>' +
                    '<span>Save</span>' +
                    '</button>' +
                    '<button class="btn btn-secondary btn-sm d-flex align-items-center" ng-click="cancelEdit()">' +
                    '<i class="bi bi-x-circle me-1"></i>' +
                    '<span>Cancel</span>' +
                    '</button>' +
                    '</div>' +

                    '<div class="validation text-danger small mt-2" ng-if="!editModel.title">Title is required</div>' +
                    '</div>' +

                    '<div class="todo-actions" ng-if="!isEditing">' +

                    '<button class="btn btn-outline-secondary btn-sm todo-action-btn" ' +
                    'ng-click="startEdit()" ng-disabled="todo.completed" title="Edit">' +
                    '<i class="bi bi-pencil-fill"></i>' +
                    '</button>' +

                    '<button class="btn btn-outline-secondary btn-sm todo-action-btn" ' +
                    'ng-if="totalCount > 1" ' +
                    'ng-click="moveUp()" title="Move up">' +
                    '<i class="bi bi-arrow-up"></i>' +
                    '</button>' +

                    '<button class="btn btn-outline-secondary btn-sm todo-action-btn" ' +
                    'ng-if="totalCount > 1" ' +
                    'ng-click="moveDown()" title="Move down">' +
                    '<i class="bi bi-arrow-down"></i>' +
                    '</button>' +

                    '<button class="btn btn-outline-danger btn-sm todo-action-btn" ' +
                    'ng-click="remove()" title="Delete">' +
                    '<i class="bi bi-trash-fill"></i>' +
                    '</button>' +

                    '</div>' + // .todo-actions

                    '</div>' + // .todo-row-main

                    '</div>', // .todo-item outer
                controller: ['$scope', function($scope){
                    $scope.isEditing = false;
                    $scope.editModel = {};

                    $scope.toggle = function(){
                        // checkbox already flipped todo.completed
                        // just ask parent to persist
                        $scope.onToggle({task: $scope.todo});
                    };

                    $scope.remove = function(){
                        $scope.onDelete({task: $scope.todo});
                    };

                    $scope.moveUp = function(){
                        $scope.onMoveUp({index: $scope.index});
                    };

                    $scope.moveDown = function(){
                        $scope.onMoveDown({index: $scope.index});
                    };

                    $scope.startEdit = function(){
                        $scope.isEditing = true;
                        $scope.editModel = {
                            title: $scope.todo.title,
                            description: $scope.todo.description
                        };
                    };

                    $scope.cancelEdit = function(){
                        $scope.isEditing = false;
                    };

                    $scope.saveEdit = function(){
                        if(!$scope.editModel.title){ return; }
                        $scope.todo.title = $scope.editModel.title.trim();
                        $scope.todo.description = ($scope.editModel.description || '').trim();
                        $scope.isEditing = false;
                        $scope.onSave();
                    };

                    // Enter = save (unless Shift+Enter), Escape = cancel
                    $scope.handleEditKeys = function($event){
                        if($event.key === 'Enter' && !$event.shiftKey){
                            $event.preventDefault();
                            $scope.saveEdit();
                        } else if ($event.key === 'Escape'){
                            $scope.cancelEdit();
                        }
                    };
                }]
            };
        }]);
})();
