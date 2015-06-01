(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {
                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('public', {
                        url: '/',
                        templateUrl: 'app/views/public/public.html',
                        controller: 'PublicController',
                        controllerAs: 'ctrl'
                    })
                    .state('admin', {
                        url: '/admin',
                        templateUrl: 'app/views/admin/admin.html',
                        controller: 'AdminController',
                        controllerAs: 'ctrl'
                    });
            }
        ]);
})();