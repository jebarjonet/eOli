(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {
                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('admin', {
                        url: '/admin',
                        templateUrl: 'app/views/admin/admin.html',
                        controller: 'AdminController',
                        controllerAs: 'ctrl'
                    })
                    .state('auth', {
                        url: '/auth',
                        templateUrl: 'app/views/auth/auth.html',
                        controller: 'AuthController',
                        controllerAs: 'ctrl'
                    })
                    .state('public', {
                        url: '/',
                        templateUrl: 'app/views/public/public.html',
                        controller: 'PublicController',
                        controllerAs: 'ctrl'
                    });
            }
        ])
        .run(['$rootScope', '$state', 'user', function($rootScope, $state, user) {
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                user.checkStatus(function() {
                    if(!user.isLoggedIn() && ~toState.name.indexOf('admin')) {
                        e.preventDefault();
                        $state.go('auth');
                    }
                });
            });
        }]);
})();