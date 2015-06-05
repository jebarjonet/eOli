(function() {
    'use strict';

    angular.module('app')
        .controller('linkSetterController', ['Period', 'crudHelper', '_', '$scope', linkSetterController])
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
                bindToController: true
            };
        });

    function linkSetterController(Period, crudHelper, _, $scope) {
        var vm = this;
        vm.values = [];
        crudHelper.getAll(vm, 'unsortedPeriods', Period, function() {
            vm.periods = _.sortBy(vm.unsortedPeriods, 'startAt[0]');
            watchModel();
        });

        // bind view to model
        $scope.$watchCollection(function() { return vm.values; }, function(values) {
            vm.model = _.compact(_.map(values, function(value, k) {
                if(parseInt(value) > 0) {
                    return {
                        period: vm.periods[k]._id,
                        value: value
                    };
                }
            }));
        });

        // bind model to view
        function watchModel() {
            $scope.$watchCollection(function() { return vm.model; }, function(relations) {
                _.forEach(relations, function(relation) {
                    var index = _.findIndex(vm.periods, { _id: relation.period });
                    vm.values[index] = relation.value;
                });
            });
        }
    }
})();