(function() {
    'use strict';

    angular.module('app')
        .directive('confirmationButton', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    btnClass: '=',
                    btnText: '=',
                    menuText: '=',
                    entity: '=',
                    action: '&'
                },
                templateUrl: 'app/components/confirmationButton/confirmationButton.html'
            };
        });
})();