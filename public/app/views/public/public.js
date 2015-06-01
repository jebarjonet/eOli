(function(){
    'use strict';

    angular.module('app')
        .controller('PublicController', ['mapConfig', PublicController]);

    function PublicController(mapConfig) {
        var vm = this;
        vm.map = mapConfig.config;
    }
})();