(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminRoute])
        .controller('AdminController', ['$rootScope', '$state', AdminController]);

    function AdminController($rootScope, $state) {
        var vm = this;
        vm.navbarCollapsed = true;

        updateTitle($state.current.data);
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, _fromState, fromParams){
            updateTitle(toState.data);
        });

        function updateTitle(data) {
            var title = 'Administration';
            if(data !== undefined && data.hasOwnProperty('title')) {
                title = data.title;
            }
            vm.title = title;
        }
    }

    function AdminRoute($stateProvider) {
        $stateProvider
            .state('admin.categories', {
                url: '/categories',
                templateUrl: 'app/views/admin/categories/categories.html',
                controller: 'AdminCategoriesController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Liste des catégories'
                }
            });
    }
})();