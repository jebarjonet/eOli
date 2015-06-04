(function() {
    'use strict';

    angular.module('app')
        .directive('categoryIcon', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/categoryIcon/categoryIcon.html',
                scope: {
                    category: '=',
                    small: '@'
                },
                replace: true
            };
        });
})();