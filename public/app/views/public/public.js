(function(){
    'use strict';

    angular.module('app')
        .controller('PublicController', ['Place', 'crudHelper', 'mapService', PublicController]);

    function PublicController(Place, crudHelper, mapService) {
        var vm = this;
        vm.map = mapService.config.config;
        vm.markers = {};
        crudHelper.getAll(vm, 'places', Place, function(){
            vm.places.forEach(function(place) {
                var marker = mapService.manipulation.markerFromPlace(place);
                angular.merge(
                    marker,
                    mapService.config.mapIcon(place.category)
                );
                vm.markers[place._id] = marker;
            });
        });
    }
})();