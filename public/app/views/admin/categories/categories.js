(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminCategoriesRoute])
        .controller('AdminCategoriesController', AdminCategoriesController);

    AdminCategoriesController.$inject = ['Category', 'crudHelper'];

    function AdminCategoriesController(Category, crudHelper) {
        var vm = this;
        vm.categories = [];
        crudHelper.getAll(Category, function(res) {
            vm.categories = res;
        });
    }

    function AdminCategoriesRoute($stateProvider) {
        //$stateProvider
        //    .state('admin.categories-add', {
        //        url: '/categories/add',
        //        templateUrl: 'app/views/admin/categories/form.html',
        //        controller: 'AdminCategoriesAddController',
        //        controllerAs: 'ctrl'
        //    })
        //    .state('admin.categories-edit', {
        //        url: '/categories/edit/:id',
        //        templateUrl: 'app/views/admin/categories/form.html',
        //        controller: 'AdminCategoriesEditController',
        //        controllerAs: 'ctrl'
        //    });
    }
})();