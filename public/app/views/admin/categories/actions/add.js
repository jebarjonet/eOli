(function(){
    'use strict';

    angular.module('app')
        .controller('AdminCategoriesAddController', AdminCategoriesAddController);

    AdminCategoriesAddController.$inject = ['Category', 'crudHelper'];

    function AdminCategoriesAddController(Category, crudHelper) {
        var vm = this;
        vm.category = angular.copy(Category.model);

        vm.submit = function() {
            crudHelper.create(vm, Category, vm.category, 'admin.categories');
        };
    }
})();


