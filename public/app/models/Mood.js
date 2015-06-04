(function(){
    'use strict';

    angular.module('app')
        .factory('Mood', function(){
            return {
                model: {
                    name: '',
                    categories: []
                },
                endpoint: 'moods'
            };
        });
})();