(function(){
    'use strict';

    angular.module('app')
        .service('search', ['crudHelper', 'mapService', 'leafletData', function(crudHelper, mapService, leafletData){
            var _this = this;
            _this.markers = {};

            /**
             * Markers
             */
            _this.markers.user = angular.merge({
                    lat: 48.864365,
                    lng: 2.334042,
                    draggable: true
                },
                mapService.config.mapIcon('user')
            );

            _this.query = function(query) {
                console.log(query);
                crudHelper.RA.all('search').post().then(function(places){
                    addMarkers(places);
                });
            };

            function addMarkers(places) {
                places.forEach(function(place) {
                    var marker = mapService.manipulation.locFromPlace(place);
                    angular.merge(
                        marker,
                        mapService.config.mapIcon(place.category)
                    );
                    _this.markers[place._id] = marker;
                });
            }
        }]);
})();