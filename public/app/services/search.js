(function(){
    'use strict';

    angular.module('app')
        .service('search', ['crudHelper', 'mapService', 'leafletData', '_', function(crudHelper, mapService, leafletData, _){
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

            _this.clean = function() {
                var markers = {};
                markers.user = _this.markers.user;
                _this.markers = markers;
            };

            _this.query = function(query, cb) {
                _this.clean();
                leafletData.getMarkers().then(function(markers) {
                    query.loc = markers.user.getLatLng();
                    crudHelper.RA.all('search').customPOST(query).then(function(places){
                        addMarkers(places);
                        if(cb) {
                            cb();
                        }
                    });
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