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
                    lat: parseFloat(place.loc[1]),
                    lng: parseFloat(place.loc[0])
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
                        parseFloat(place.loc[1]),
                        parseFloat(place.loc[0])
                    ],
                    15,
                    options
                );
            }
        }]);
})();