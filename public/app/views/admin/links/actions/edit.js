(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksEditController', AdminLinksEditController);

    AdminLinksEditController.$inject = ['Link', 'Category', 'crudHelper', 'mapService', 'leafletData', '$state'];

    function AdminLinksEditController(Link, Category, crudHelper, mapService, leafletData, $state) {
        var vm = this;

    }
})();