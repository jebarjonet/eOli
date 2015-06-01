(function(){
    'use strict';

    angular.module('app')
        .service('geolocator', [function(){
            var _this = this;
            angular.merge(_this, {
                findPlace: findPlace
            });

            function findPlace(name, callback) {
                // should be a Google API call retrieving place information
                var res = {
                    address: '3 rue des arbres',
                    lat: '48.864365',
                    lng: '2.314042'
                };
                callback(res);
            }
        }]);
})();