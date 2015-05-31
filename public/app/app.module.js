(function() {
    'use strict';

    var modules = [
        'ui.router',
        'restangular',
        'ui.bootstrap',
        'leaflet-directive',
        'templates'
    ];
    angular.module('app', modules)
        .constant('_', window._)
        .run(['Restangular', function(Restangular) {
            Restangular.setBaseUrl('/api');
        }]);
})();