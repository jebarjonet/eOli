(function() {
    'use strict';

    var modules = [
        'ui.router',
        'restangular',
        'ui.bootstrap',
        'leaflet-directive'
    ];
    angular.module('app', modules)
        .constant('_', window._)
        .run(['Restangular', function(Restangular) {
            Restangular.setBaseUrl('/api');
        }]);
})();