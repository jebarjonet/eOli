(function(){
    'use strict';

    angular.module('app')
        .service('mapService', ['mapConfig', 'mapManipulation', 'geolocator', function(mapConfig, mapManipulation, geolocator){
            var _this = this;
            angular.merge(_this, {
                config: mapConfig,
                manipulation: mapManipulation,
                geolocator: geolocator
            });
        }]);
})();