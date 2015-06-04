(function() {
    'use strict';

    angular.module('app')
        .controller('linkSetterController', [linkSetterController])
        .directive('linkSetter', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/linkSetter/linkSetter.html',
                scope: {
                    model: '=ngModel',
                    periods: '='
                },
                require: 'ngModel',
                controller: 'linkSetterController',
                controllerAs: 'ctrl',
                bindToController: true,
                replace: true,
                link: function(scope, element, attrs, ngModel) {
                    // validity setter
                }
            };
        });

    function linkSetterController() {
        var vm = this;
    }
})();