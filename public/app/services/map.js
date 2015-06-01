(function(){
    'use strict';

    angular.module('app')
        .factory('mapConfig', ['_', function(_){
            var config = {
                center: {
                    lat: 48.856874,
                    lng: 2.336285,
                    zoom: 13
                },
                defaults: {
                    tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                    tileLayerOptions: {
                        detectRetina: true,
                        reuseTiles: true
                    },
                    minZoom: 13,
                    maxZoom: 17,
                    zoomControl: false,
                    attributionControl: false
                }
            };

            return {
                config: config,
                adminConfig: adminConfig()
            };

            function adminConfig() {
                return _.merge(_.cloneDeep(config), {
                    center: {
                        zoom: 17
                    }
                });
            }
        }]);
})();