(function(){
    'use strict';

    angular.module('app')
        .controller('AdminCategoriesAddController', AdminCategoriesAddController);

    AdminCategoriesAddController.$inject = ['Category', 'crudHelper', '$state'];

    function AdminCategoriesAddController(Category, crudHelper, $state) {
        var vm = this;
        vm.loading = false;
        vm.actionName = 'Ajouter';
        vm.category = {};

        vm.submit = function() {
            vm.loading = true;

            crudHelper.create(Category, vm.category,
                function() {
                    $state.go('admin.categories');
                }, function(e) {
                    vm.errors = e.data.errors;
                    vm.loading = false;
                }
            );
        };
    }
})();


