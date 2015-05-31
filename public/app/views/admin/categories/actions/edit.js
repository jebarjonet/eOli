(function(){
    'use strict';

    angular.module('app')
        .controller('AdminCategoriesEditController', AdminCategoriesEditController);

    AdminCategoriesEditController.$inject = ['Category', 'crudHelper', '$state'];

    function AdminCategoriesEditController(Category, crudHelper, $state) {
        var vm = this;
        vm.loading = false;
        vm.actionName = 'Éditer';
        vm.category = {};
        crudHelper.get(Category, $state.params.id, function(res) {
            vm.category = res;
        });

        vm.submit = function() {
            vm.loading = true;

            crudHelper.update(Category, $state.params.id, vm.category,
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