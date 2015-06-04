(function(){
    'use strict';

    angular.module('app')
        .controller('AdminCategoriesEditController', AdminCategoriesEditController);

    AdminCategoriesEditController.$inject = ['Category', 'crudHelper', '$state'];

    function AdminCategoriesEditController(Category, crudHelper, $state) {
        var vm = this;
        vm.deletable = true;
        crudHelper.get(vm, 'category', Category, $state.params.id, function() {
            vm.category.count = 0;
            // getting the count of places using this category
            crudHelper.RA.one(Category.endpoint, vm.category._id).customGET('count').then(function(count) {
                vm.category.count = count;
            });
        });

        vm.submit = function() {
            crudHelper.update(vm, Category, $state.params.id, vm.category, 'admin.categories');
        };

        vm.remove = function() {
            crudHelper.remove(Category, vm.category._id, vm.category, 'admin.categories');
        };
    }
})();