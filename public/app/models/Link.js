(function(){
    'use strict';

    angular.module('app')
        .factory('Link', function(){
            return {
                model: {
                    categories: [],
                    relations: []
                },
                endpoint: 'links'
            };
        });
})();