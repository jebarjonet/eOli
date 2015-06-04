(function() {
    'use strict';

    angular.module('app')
        .directive('periodHours', function() {
            return {
                restrict: 'A',
                scope: {
                    model: '=ngModel'
                },
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$formatters.push(function(value){
                        return value.join(', ');
                    });

                    ngModel.$parsers.push(function(value){
                        return value.split(',').map(function(val) {
                            return parseInt(val);
                        });
                    });

                    ngModel.$validators.hours = function(modelValue, viewValue) {
                        if(!viewValue.match(/^\s*\d+\s*(,\s*\d+\s*)*\s*$/)) {
                            return false;
                        }
                        return true;
                    };
                }
            };
        });
})();