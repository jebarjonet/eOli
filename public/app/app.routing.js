(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('admin', {
                        url: '/admin',
                        templateUrl: 'app/views/admin/admin.html',
                        controller: 'AdminController',
                        controllerAs: 'ctrl',
                        resolve: {
                            loggedIn: checkLoggedIn
                        }
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

                function checkLoggedIn(user, $q, $state){
                    var deferred = $q.defer();
                    user.checkStatus(function() {
                        if(user.isLoggedIn()) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $state.go('auth');
                        }
                    });
                    return deferred.promise;
                }
            }
        ]);
})();