(function(){
    'use strict';

    angular.module('app')
        .service('mapConfig', ['parameters', function(parameters){
            var _this = this;

            _this.config = {
                center: {
                    lat: 48.856874,
                    lng: 2.336285,
                    zoom: 13
                },
                defaults: {
                    tileLayer: 'https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token='+parameters.mapboxKey,
                    //tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
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

            _this.mapIcon = function(category) {
                return {
                    icon: {
                        type: 'div',
                        iconSize: [48, 48],
                        iconAnchor: [24, 55],
                        popupAnchor: [0, -51],
                        html: '<div class="icon icon-public" style="background-color:#' + category.color + ';"><i class="fa fa-' + category.icon + '"></i></div>'
                    }
                };
            };
        }]);
})();