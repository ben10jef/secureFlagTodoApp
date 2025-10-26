(function(){
    'use strict';

    angular.module('todoApp')
        .controller('NavController', ['$scope', function($scope){
            var vm = this;

            vm.brand = {
                logo: 'https://www.secureflag.com/assets/images/logo.svg',
                text: 'TODO App'
            };

            vm.links = [
                { key: 'all',       label: 'All',        href: '#!/' },
                { key: 'active',    label: 'Active',     href: '#!/active' },
                { key: 'completed', label: 'Completed',  href: '#!/completed' }
            ];

            vm.isSelected = function(key) {
                return $scope.currentFilter === key;
            };
        }]);
})();
