(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPeriodsEditController', AdminPeriodsEditController);

    AdminPeriodsEditController.$inject = ['Period', 'crudHelper', '$state'];

    function AdminPeriodsEditController(Period, crudHelper, $state) {
        var vm = this;
        vm.deletable = true;
        crudHelper.get(vm, 'period', Period, $state.params.id);

        vm.submit = function() {
            crudHelper.update(vm, Period, $state.params.id, vm.period, 'admin.periods');
        };

        vm.remove = function() {
            crudHelper.remove(Period, vm.period._id, vm.period, 'admin.periods');
        };
    }
})();