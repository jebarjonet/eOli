(function() {
    'use strict';

    angular.module('app')
        .directive('deleteButton', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    class: '@',
                    entity: '=',
                    action: '&'
                },
                templateUrl: 'app/components/deleteButton/deleteButton.html'
            };
        });
})();