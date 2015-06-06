(function(){
    'use strict';

    angular.module('app')
        .controller('AuthController', ['$http', '$state', AuthController]);

    function AuthController($http, $state) {
        var vm = this;
    }
})();