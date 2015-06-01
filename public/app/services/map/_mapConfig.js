(function(){
    'use strict';

    angular.module('app')
        .service('mapConfig', [function(){
            var _this = this;

            _this.config = {
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

            _this.adminConfig = angular.merge(angular.copy(_this.config), {
                center: {
                    zoom: 17
                }
            });
        }]);
})();