(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPlacesEditController', AdminPlacesEditController);

    AdminPlacesEditController.$inject = ['Place', 'Category', 'crudHelper', 'mapService', 'leafletData', '$state'];

    function AdminPlacesEditController(Place, Category, crudHelper, mapService, leafletData, $state) {
        var vm = this;
        vm.loading = false;
        vm.deletable = true;
        vm.markers = {};
        vm.map = mapService.config.adminConfig;
        crudHelper.get(vm, 'place', Place, $state.params.id, function() {
            vm.markers.main = mapService.manipulation.markerFromPlace(vm.place);
            angular.merge(
                vm.markers.main,
                mapService.config.mapIcon(vm.place.category)
            );
            leafletData.getMap().then(function(map) {
                mapService.manipulation.setView(map, vm.place, {animate: false});
            });
            vm.place.category = vm.place.category._id;
        });
        crudHelper.getAll(vm, 'categories', Category);

        vm.submit = function() {
            crudHelper.update(vm, Place, $state.params.id, vm.place, 'admin.places');
        };

        vm.find = function() {
            mapService.geolocator.findPlace(vm.place.name, function(res) {
                angular.merge(vm.place, res);
                vm.markers.main = mapService.manipulation.markerFromPlace(vm.place);
                leafletData.getMap().then(function(map) {
                    mapService.manipulation.setView(map, vm.place);
                });
            });
        };

        vm.remove = function() {
            crudHelper.remove(Place, vm.place._id, vm.place, 'admin.places');
        };
    }
})();