(function(){
    'use strict';

    angular.module('app')
        .controller('PublicController', ['mapService', 'leafletData', 'search', 'user', '_', '$scope', PublicController]);

    function PublicController(mapService, leafletData, search, user, _, $scope) {
        var vm = this;
        vm.map = mapService.config.config;
        vm.user = user;
        vm.markers = search.markers;

        // updating z-index of each markers when user marker is dragged
        $scope.$on('leafletDirectiveMarker.dragend', function(){
            leafletData.getMarkers().then(function(markers) {
                _.forEach(markers, function(marker) {
                    marker.update();
                });
            });
        });
    }
})();