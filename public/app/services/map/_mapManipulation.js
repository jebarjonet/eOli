(function(){
    'use strict';

    angular.module('app')
        .service('mapManipulation', [function(){
            var _this = this;
            angular.merge(_this, {
                markerFromPlace: markerFromPlace,
                setView: setView
            });

            function markerFromPlace(place) {
                return {
                    lat: parseFloat(place.lat),
                    lng: parseFloat(place.lng)
                };
            }

            function setView(map, place, o) {
                var options = {
                    animate: true
                };

                if(o) {
                    angular.merge(options, o);
                }

                map.setView([
                        parseFloat(place.lat),
                        parseFloat(place.lng)
                    ],
                    15,
                    options
                );
            }
        }]);
})();