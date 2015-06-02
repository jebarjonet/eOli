(function(){
    'use strict';

    angular.module('app')
        .factory('Place', function(){
            return {
                model: {
                    name: '',
                    category: '',
                    description: '',
                    address: '',
                    lat: '',
                    lng: ''
                },
                endpoint: 'places'
            };
        });
})();