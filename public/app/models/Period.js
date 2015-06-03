(function(){
    'use strict';

    angular.module('app')
        .factory('Period', function(){
            return {
                model: {
                    name: '',
                    startAt: []
                },
                endpoint: 'periods'
            };
        });
})();