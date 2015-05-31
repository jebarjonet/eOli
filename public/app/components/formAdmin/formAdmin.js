(function() {
    'use strict';

    angular.module('app')
        .directive('formAdmin', function() {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                templateUrl: 'components/formAdmin/formAdmin.html'
            };
        });
})();