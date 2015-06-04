(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPeriodsAddController', AdminPeriodsAddController);

    AdminPeriodsAddController.$inject = ['Period', 'crudHelper'];

    function AdminPeriodsAddController(Period, crudHelper) {
        var vm = this;
        vm.period = angular.copy(Period.model);

        vm.submit = function() {
            crudHelper.create(vm, Period, vm.period, 'admin.periods');
        };
    }
})();