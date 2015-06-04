(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminPeriodsRoute])
        .controller('AdminPeriodsController', AdminPeriodsController);

    AdminPeriodsController.$inject = ['Period', 'crudHelper'];

    function AdminPeriodsController(Period, crudHelper) {
        var vm = this;
        crudHelper.getAll(vm, 'periods', Period);

        vm.remove = function(period) {
            crudHelper.remove(Period, period._id, period, null, function() {
                _.pull(vm.periods, period);
            });
        };
    }

    function AdminPeriodsRoute($stateProvider) {
        $stateProvider
            .state('admin.periods-add', {
                url: '/periods/add',
                templateUrl: 'app/views/admin/periods/form.html',
                controller: 'AdminPeriodsAddController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Ajouter une période'
                }
            })
            .state('admin.periods-edit', {
                url: '/periods/edit/:id',
                templateUrl: 'app/views/admin/periods/form.html',
                controller: 'AdminPeriodsEditController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Éditer une période'
                }
            });
    }
})();