(function(){
    'use strict';

    angular.module('app')
        .controller('PublicController', ['mapService', 'leafletData', 'search', '_', '$scope', PublicController]);

    function PublicController(mapService, leafletData, search, _, $scope) {
        var vm = this;
        vm.map = mapService.config.config;
        search.init();
        vm.markers = search.markers;

        // watching changes from search service
        $scope.$watch(function() {return search.markers;}, function(markers) {
            vm.markers = markers;
        }, true);

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