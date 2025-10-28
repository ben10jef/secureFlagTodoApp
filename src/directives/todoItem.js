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
                    onSave: '&',
                    onReorder: '&'
                },
                template:
                    '<div class="todo-item cursor-pointer" ' +
                    'ng-class="{ \'done\': todo.completed, \'pending\': !todo.completed, \'drag-over\': isDragOver }" ' +
                    'ng-click="toggle($event)" ' +
                    'draggable="true">' +

                    '<div class="todo-row-main" >' +

                    '<div class="todo-main" ng-if="!isEditing">' +
                    '<div class="todo-title d-flex align-items-center gap-2">' +
                    '<i class="bi bi-check-circle-fill text-success" ng-if="todo.completed"></i>' +
                    '<i class="bi bi-circle text-danger" ng-if="!todo.completed"></i>' +
                    '<span>{{todo.title}}</span>' +
                    '</div>' +
                    '<div class="todo-desc text-secondary small" ng-if="todo.description">{{todo.description}}</div>' +
                    '</div>' +

                    '<div class="todo-edit border rounded p-3 w-100" ng-if="isEditing">' +

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
                    '<button class="btn btn-success btn-sm d-flex align-items-center" ng-click="saveEdit($event)">' +
                    '<i class="bi bi-save me-1"></i>' +
                    '<span>Save</span>' +
                    '</button>' +
                    '<button class="btn btn-secondary btn-sm d-flex align-items-center" ng-click="cancelEdit($event)">' +
                    '<i class="bi bi-x-circle me-1"></i>' +
                    '<span>Cancel</span>' +
                    '</button>' +
                    '</div>' +

                    '<div class="validation text-danger small mt-2" ng-if="!editModel.title">Title is required</div>' +
                    '</div>' +

                    '<div class="todo-actions" ng-if="!isEditing">' +

                    '<button class="btn btn-outline-secondary btn-sm todo-action-btn" ' +
                    'ng-click="startEdit($event)" ng-if="!todo.completed" ng-disabled="todo.completed" title="Edit">' +
                    '<i class="bi bi-pencil-fill"></i>' +
                    '</button>' +

                    // '<button class="btn btn-outline-secondary btn-sm todo-action-btn" ' +
                    // 'ng-if="totalCount > 1" ' +
                    // 'ng-click="moveUp($event)" title="Move up">' +
                    // '<i class="bi bi-arrow-up"></i>' +
                    // '</button>' +
                    //
                    // '<button class="btn btn-outline-secondary btn-sm todo-action-btn" ' +
                    // 'ng-if="totalCount > 1" ' +
                    // 'ng-click="moveDown($event)" title="Move down">' +
                    // '<i class="bi bi-arrow-down"></i>' +
                    // '</button>' +

                    '<button class="btn btn-outline-danger btn-sm todo-action-btn" ' +
                    'ng-click="remove($event)" title="Delete">' +
                    '<i class="bi bi-trash-fill"></i>' +
                    '</button>' +

                    '</div>' + // .todo-actions

                    '</div>' + // .todo-row-main

                    '</div>', // .todo-item outer

                controller: ['$scope', '$rootScope', function($scope, $rootScope){
                    $scope.isEditing = false;
                    $scope.editModel = {};
                    $scope.isDragOver = false;

                    // toggle complete
                    $scope.toggle = function($event){
                        if ($scope.isEditing) {
                            if ($event) { $event.stopPropagation(); }
                            return;
                        }
                        $scope.todo.completed = !$scope.todo.completed;
                        $scope.onToggle({task: $scope.todo});
                    };

                    // editing
                    $scope.startEdit = function($event){
                        if ($event) { $event.stopPropagation(); }
                        $scope.isEditing = true;
                        $scope.editModel = {
                            title: $scope.todo.title,
                            description: $scope.todo.description
                        };
                    };

                    $scope.cancelEdit = function($event){
                        if ($event) { $event.stopPropagation(); }
                        $scope.isEditing = false;
                    };

                    $scope.saveEdit = function($event){
                        if ($event) { $event.stopPropagation(); }
                        if(!$scope.editModel.title){ return; }
                        $scope.todo.title = $scope.editModel.title.trim();
                        $scope.todo.description = ($scope.editModel.description || '').trim();
                        $scope.isEditing = false;
                        $scope.onSave();
                    };

                    // up/down/delete
                    $scope.remove = function($event){
                        if ($event) { $event.stopPropagation(); }
                        $scope.onDelete({task: $scope.todo});
                    };

                    $scope.moveUp = function($event){
                        if ($event) { $event.stopPropagation(); }
                        $scope.onMoveUp({index: $scope.index});
                    };

                    $scope.moveDown = function($event){
                        if ($event) { $event.stopPropagation(); }
                        $scope.onMoveDown({index: $scope.index});
                    };

                    // keyboard in edit mode
                    $scope.handleEditKeys = function($event){
                        if($event.key === 'Enter' && !$event.shiftKey){
                            $event.preventDefault();
                            $scope.saveEdit();
                        } else if ($event.key === 'Escape'){
                            $scope.cancelEdit();
                        }
                    };

                    //
                    // DRAG + DROP API exposed to link()
                    //
                    $scope.dragStart = function(event){
                        if ($scope.isEditing) {
                            event.preventDefault();
                            return;
                        }
                        $rootScope.drag_src_index = $scope.index;
                        event.dataTransfer.effectAllowed = 'move';
                        event.dataTransfer.setData('text/plain', $scope.index); // firefox needs this
                    };

                    $scope.dragOver = function(event){
                        // allow drop
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                        if ($rootScope.drag_src_index === undefined) return;
                        if ($rootScope.drag_src_index === $scope.index) return;
                        if (!$scope.isDragOver){
                            $scope.$apply(function(){
                                $scope.isDragOver = true;
                            });
                        }
                    };

                    $scope.dragLeave = function(event){
                        if ($scope.isDragOver){
                            $scope.$apply(function(){
                                $scope.isDragOver = false;
                            });
                        }
                    };

                    $scope.drop = function(event){
                        event.preventDefault();

                        var from = $rootScope.drag_src_index;
                        var to = $scope.index;

                        // clear hover ui
                        $scope.$apply(function(){
                            $scope.isDragOver = false;
                        });

                        if (from !== undefined && from !== to){
                            $scope.onReorder({ fromIndex: from, toIndex: to });
                        }
                    };

                    $scope.dragEnd = function(){
                        $scope.$applyAsync(function(){
                            $scope.isDragOver = false;
                        });
                        $rootScope.drag_src_index = undefined;
                    };
                }],

                link: function(scope, element){
                    // bind native drag/drop events to the root DOM node
                    element[0].addEventListener('dragstart', function(e){
                        scope.dragStart(e);
                    });

                    element[0].addEventListener('dragover', function(e){
                        scope.dragOver(e);
                    });

                    element[0].addEventListener('dragleave', function(e){
                        scope.dragLeave(e);
                    });

                    element[0].addEventListener('drop', function(e){
                        scope.drop(e);
                    });

                    element[0].addEventListener('dragend', function(e){
                        scope.dragEnd(e);
                    });
                }
            };
        }]);
})();
