(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPlacesAddController', AdminPlacesAddController);

    AdminPlacesAddController.$inject = ['Place', 'Category', 'crudHelper', 'mapService', 'leafletData'];

    function AdminPlacesAddController(Place, Category, crudHelper, mapService, leafletData) {
        var vm = this;
        vm.markers = {};
        vm.map = mapService.config.adminConfig;
        vm.place = angular.copy(Place.model);
        crudHelper.getAll(vm, 'categories', Category);

        vm.submit = function() {
            crudHelper.create(vm, Place, vm.place, 'admin.places');
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

        vm.toggleActivated = function() {
            vm.place.activated = !vm.place.activated;
        };
    }
})();


