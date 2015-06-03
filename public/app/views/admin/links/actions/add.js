(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksAddController', AdminLinksAddController);

    AdminLinksAddController.$inject = ['Link', 'Category', 'crudHelper', 'mapService', 'leafletData'];

    function AdminLinksAddController(Link, Category, crudHelper, mapService, leafletData) {
        var vm = this;

    }
})();


