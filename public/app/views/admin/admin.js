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
            .state('admin.links', {
                url: '/links',
                templateUrl: 'app/views/admin/links/links.html',
                controller: 'AdminLinksController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Liste des liens entre catégories'
                }
            })
            .state('admin.moods', {
                url: '/moods',
                templateUrl: 'app/views/admin/moods/moods.html',
                controller: 'AdminMoodsController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Liste des humeurs'
                }
            })
            .state('admin.periods', {
                url: '/periods',
                templateUrl: 'app/views/admin/periods/periods.html',
                controller: 'AdminPeriodsController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Liste des périodes'
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