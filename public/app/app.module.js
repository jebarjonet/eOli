(function() {
    'use strict';

    var modules = [
        'ui.router',
        'restangular',
        'ui.bootstrap',
        'ngTagsInput',
        'leaflet-directive'
    ];
    angular.module('app', modules)
        .constant('_', window._)
        .run(['Restangular', function(Restangular) {
            Restangular.setBaseUrl('/api');
        }]);
})();