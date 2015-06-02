(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminCategoriesRoute])
        .controller('AdminCategoriesController', AdminCategoriesController);

    AdminCategoriesController.$inject = ['Category', 'crudHelper', '_'];

    function AdminCategoriesController(Category, crudHelper, _) {
        var vm = this;
        crudHelper.getAll(vm, 'categories', Category, function() {
            // setting total places for each category to 0
            vm.categories.map(function(category) {
                 return angular.merge(category,
                    {
                        total: 0
                    });
            });
            // getting total places for each category
            crudHelper.RA.all(Category.endpoint).customGET('total').then(function(totals) {
                vm.categories.map(function(category) {
                    return angular.merge(category, {
                        total: _.findWhere(totals, { id: category._id }).total
                    });
                });
            });
        });

        vm.remove = function(category) {
             crudHelper.remove(Category, category._id, category, null, function() {
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