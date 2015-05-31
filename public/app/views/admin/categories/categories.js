(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminCategoriesRoute])
        .controller('AdminCategoriesController', AdminCategoriesController);

    AdminCategoriesController.$inject = ['Category', 'crudHelper'];

    function AdminCategoriesController(Category, crudHelper) {
        var vm = this;
        crudHelper.getAll(vm, Category, 'categories');

        vm.remove = function(category) {
             crudHelper.remove(Category, category._id, null, function() {
                 _.remove(vm.categories, function (n) {
                     return n._id === category._id;
                 });
             });
        };
    }

    function AdminCategoriesRoute($stateProvider) {
        $stateProvider
            .state('admin.categories-add', {
                url: '/categories/add',
                templateUrl: 'app/views/admin/categories/form.html',
                controller: 'AdminCategoriesAddController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Ajouter une catégorie'
                }
            })
            .state('admin.categories-edit', {
                url: '/categories/edit/:id',
                templateUrl: 'app/views/admin/categories/form.html',
                controller: 'AdminCategoriesEditController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Éditer une catégorie'
                }
            });
    }
})();