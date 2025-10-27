(function () {
    'use strict';

    angular.module('todoApp')
        .directive('topBar', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    currentFilter: '='
                },
                template:
                    '<header class="sf-nav-bar border-bottom">' +
                    '<div class="sf-nav-inner container-fluid">' +

                    '<div class="sf-center-block">' +

                    '<div class="sf-brand d-flex align-items-center">' +
                    '<img class="sf-brand-logo" ng-src="{{nav.brand.logo}}" alt="App logo" />' +
                    '<span class="sf-brand-text ms-2">{{nav.brand.text}}</span>' +
                    '</div>' +

                    // '<nav class="sf-links" role="navigation">' +
                    // '<a ng-repeat="link in nav.links"' +
                    // ' class="sf-link text-decoration-none"' +
                    // ' ng-href="{{link.href}}"' +
                    // ' ng-class=' +
                    // '"{' +
                    // '\'sf-link--active\': nav.isSelected(link.key)' +
                    // '}"' +
                    // '>' +
                    // '<span class="sf-link-label">{{link.label}}</span>' +
                    // '<span class="sf-link-underline" ng-if="nav.isSelected(link.key)"></span>' +
                    // '</a>' +
                    // '</nav>' +

                    '</div>' +

                    '</div>' +
                    '</header>',
                controller: 'NavController',
                controllerAs: 'nav'
            };
        }]);
})();
