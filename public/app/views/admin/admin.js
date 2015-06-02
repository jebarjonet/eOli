(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminRoute])
        .controller('AdminController', ['$rootScope', 'toasts', '$state', AdminController]);

    function AdminController($rootScope, toasts, $state) {
        var vm = this;
        vm.navbarCollapsed = true;

        updateTitle($state.current.data);
        $rootScope.$on('$stateChangeStart', function(event, toState){
            updateTitle(toState.data);
        });

        vm.toastsHidden = !toasts.show;
        toasts.listen(function(show, message) {
            vm.toastsHidden = !show;
            vm.toastsMessage = message;
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
            })
            .state('admin.places', {
                url: '/places',
                templateUrl: 'app/views/admin/places/places.html',
                controller: 'AdminPlacesController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Liste des lieux'
                }
            });
    }
})();