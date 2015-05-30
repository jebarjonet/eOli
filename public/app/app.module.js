(function() {
    'use strict';

    var modules = [
        'ui.router',
        'restangular',
        'templates'
    ];
    angular.module('app', modules)
        .constant('_', window._)
        .run(['Restangular', function(Restangular) {
            Restangular.setBaseUrl('/api');
        }]);
})();