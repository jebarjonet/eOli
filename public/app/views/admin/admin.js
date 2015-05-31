(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminRoute])
        .controller('AdminController', [AdminController]);

    function AdminController() {
        var vm = this;
        vm.navbarCollapsed = true;
    }

    function AdminRoute($stateProvider) {
        $stateProvider
            .state('admin.categories', {
                url: '/categories',
                templateUrl: 'app/views/admin/categories/categories.html',
                controller: 'AdminCategoriesController',
                controllerAs: 'ctrl'
            });
    }
})();