(function(){
    'use strict';

    angular.module('app')
        .controller('AdminCategoriesAddController', AdminCategoriesAddController);

    AdminCategoriesAddController.$inject = ['Category', 'crudHelper'];

    function AdminCategoriesAddController(Category, crudHelper) {
        var vm = this;
        vm.loading = false;
        vm.category = {};

        vm.submit = function() {
            crudHelper.create(vm, Category, vm.category, 'admin.categories');
        };
    }
})();


