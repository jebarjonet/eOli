(function(){
    'use strict';

    angular.module('app')
        .controller('AdminCategoriesEditController', AdminCategoriesEditController);

    AdminCategoriesEditController.$inject = ['Category', 'crudHelper', '$state'];

    function AdminCategoriesEditController(Category, crudHelper, $state) {
        var vm = this;
        vm.loading = false;
        vm.deletable = true;
        crudHelper.get(vm, 'category', Category, $state.params.id);

        vm.submit = function() {
            crudHelper.update(vm, Category, $state.params.id, vm.category, 'admin.categories');
        };

        vm.remove = function() {
            crudHelper.remove(Category, vm.category._id, vm.category, 'admin.categories');
        };
    }
})();