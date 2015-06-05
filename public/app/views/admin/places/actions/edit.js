(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPlacesEditController', AdminPlacesEditController);

    AdminPlacesEditController.$inject = ['Place', 'Category', 'crudHelper', 'mapService', '$state'];

    function AdminPlacesEditController(Place, Category, crudHelper, mapService, $state) {
        var vm = this;
        vm.deletable = true;
        vm.markers = {};
        vm.map = mapService.config.adminConfig;
        crudHelper.get(vm, 'place', Place, $state.params.id, function() {
            vm.markers.main = mapService.manipulation.markPlaceAndSetView(vm.place);
            vm.place.category = vm.place.category._id;
        });
        crudHelper.getAll(vm, 'categories', Category);

        vm.submit = function() {
            crudHelper.update(vm, Place, $state.params.id, vm.place, 'admin.places');
        };

        vm.find = function() {
            mapService.geolocator.findPlace(vm.place.name, function(res) {
                angular.merge(vm.place, res);
                vm.markers.main = mapService.manipulation.markPlaceAndSetView(vm.place);
            });
        };

        vm.remove = function() {
            crudHelper.remove(Place, vm.place._id, vm.place, 'admin.places');
        };

        vm.toggleActivated = function() {
            var newState = !vm.place.activated;
            crudHelper.RA.one(Place.endpoint, vm.place._id).customPUT({activated: newState}).then(function() {
                vm.place.activated = newState;
            });
        };
    }
})();