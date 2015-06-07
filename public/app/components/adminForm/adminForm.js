(function() {
    'use strict';

    angular.module('app')
        .directive('adminForm', function() {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                templateUrl: 'app/components/adminForm/adminForm.html'
            };
        });
})();