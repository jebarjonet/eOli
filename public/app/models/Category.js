(function(){
    'use strict';

    angular.module('app')
        .factory('Category', function(){
            return {
                model: {
                    name: '',
                    color: ''
                },
                endpoint: 'categories'
            };
        });
})();