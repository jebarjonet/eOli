(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPlacesEditController', AdminPlacesEditController);

    AdminPlacesEditController.$inject = ['Place', 'Category', 'crudHelper', 'mapConfig', '$state'];

    function AdminPlacesEditController(Place, Category, crudHelper, mapConfig, $state) {
        var vm = this;
        vm.loading = false;
        vm.deletable = true;
        vm.map = mapConfig.adminConfig;
        crudHelper.get(vm, 'place', Place, $state.params.id, function(res) {
            vm.place.category = vm.place.category._id;
        });
        crudHelper.getAll(vm, 'categories', Category);

        vm.submit = function() {
            crudHelper.update(vm, Place, $state.params.id, vm.place, 'admin.places');
        };

        vm.remove = function() {
            crudHelper.remove(Place, vm.place._id, 'admin.places');
        };
    }
})();