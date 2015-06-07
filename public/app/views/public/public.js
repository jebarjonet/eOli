(function(){
    'use strict';

    angular.module('app')
        .controller('PublicController', ['Place', 'crudHelper', 'mapService', 'leafletData', '_', '$scope', PublicController]);

    function PublicController(Place, crudHelper, mapService, leafletData, _, $scope) {
        var vm = this;
        vm.map = mapService.config.config;
        vm.markers = {};

        vm.markers.user = angular.merge({
                lat: 48.864365,
                lng: 2.334042,
                draggable: true
            },
            mapService.config.mapIcon('user')
        );

        crudHelper.RA.all('search').post().then(function(places){
            addMarkers(places);
        });

        // updating z-index of each markers when user marker is dragged
        $scope.$on('leafletDirectiveMarker.dragend', function(){
            leafletData.getMarkers().then(function(markers) {
                _.forEach(markers, function(marker) {
                    marker.update();
                });
            });
        });

        function addMarkers(places) {
            places.forEach(function(place) {
                var marker = mapService.manipulation.locFromPlace(place);
                angular.merge(
                    marker,
                    mapService.config.mapIcon(place.category)
                );
                vm.markers[place._id] = marker;
            });
        }
    }
})();