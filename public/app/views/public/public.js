(function(){
    'use strict';

    angular.module('app')
        .controller('PublicController', [PublicController]);

    function PublicController() {
        var vm = this;
        angular.extend(vm, {
            center: {
                lat: 48.856874,
                lng: 2.336285,
                zoom: 13
            },
            defaults: {
                tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                tileLayerOptions: {
                    detectRetina: true,
                    reuseTiles: true,
                },
                minZoom: 13,
                maxZoom: 17,
                zoomControl: false,
                attributionControl: false
            }
        });
    }
})();