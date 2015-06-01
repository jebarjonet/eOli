(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPlacesAddController', AdminPlacesAddController);

    AdminPlacesAddController.$inject = ['Place', 'Category', 'crudHelper', 'mapService', 'leafletData'];

    function AdminPlacesAddController(Place, Category, crudHelper, mapService, leafletData) {
        var vm = this;
        vm.loading = false;
        vm.markers = {};
        vm.map = mapService.config.adminConfig;
        vm.place = {
            name: 'Tour Eiffel'
        };
        crudHelper.getAll(vm, 'categories', Category);

        vm.find = function() {
            mapService.geolocator.findPlace(vm.place.name, function(res) {
                angular.merge(vm.place, res);
                vm.markers.main = mapService.manipulation.markerFromPlace(vm.place);
                leafletData.getMap().then(function(map) {
                    mapService.manipulation.setView(map, vm.place);
                });
            });
        };

        vm.submit = function() {
            crudHelper.create(vm, Place, vm.place, 'admin.places');
        };
    }
})();


