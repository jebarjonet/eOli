(function(){
    'use strict';

    angular.module('app')
        .service('search', ['crudHelper', 'mapService', function(crudHelper, mapService){
            var _this = this;

            _this.init = function() {
                _this.markers = {};
                _this.markers.user = angular.merge({
                        lat: 48.864365,
                        lng: 2.334042,
                        draggable: true
                    },
                    mapService.config.mapIcon('user')
                );
            };

            _this.query = function(query) {
                _this.init();
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