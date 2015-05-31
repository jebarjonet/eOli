(function(){
    'use strict';

    angular.module('app')
        .controller('AdminController', ['Category', 'Restangular', AdminController]);

    function AdminController(Category, Restangular) {
        var vm = this;
        vm.navbarCollapsed = true;
    }
})();