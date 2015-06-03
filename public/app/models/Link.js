(function(){
    'use strict';

    angular.module('app')
        .factory('Link', function(){
            return {
                model: {
                    categories: [],
                    value: 0,
                    period: ''
                },
                endpoint: 'links'
            };
        });
})();