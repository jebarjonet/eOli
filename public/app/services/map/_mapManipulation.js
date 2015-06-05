(function(){
    'use strict';

    angular.module('app')
        .service('mapManipulation', ['leafletData', 'mapConfig', function(leafletData, mapConfig){
            var _this = this;
            angular.merge(_this, {
                markPlaceAndSetView: markPlaceAndSetView,
                locFromPlace: locFromPlace,
                setView: setView
            });

            function markPlaceAndSetView(place) {
                var marker = angular.merge(
                    {},
                    locFromPlace(place),
                    mapConfig.mapIcon(place.category)
                );
                leafletData.getMap().then(function(map) {
                    setView(map, place);
                });
                return marker;
            }

            function locFromPlace(place) {
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