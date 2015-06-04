(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminCategoriesRoute])
        .controller('AdminCategoriesController', AdminCategoriesController);

    AdminCategoriesController.$inject = ['Category', 'crudHelper', '_'];

    function AdminCategoriesController(Category, crudHelper, _) {
        var vm = this;
        crudHelper.getAll(vm, 'categories', Category, function() {
            // setting the count of places for each category to 0 by default
            vm.categories.map(function(category) {
                 return angular.merge(category, { count: 0 });
            });
            // getting the count of places for each category
            crudHelper.RA.all(Category.endpoint).customGET('count').then(function(counts) {
                _.forEach(counts, function(count) {
                    _.findWhere(vm.categories, { _id: count._id }).count = count.count;
                });
            });
        });

        vm.remove = function(category) {
             crudHelper.remove(Category, category._id, category, null, function() {
                 _.pull(vm.categories, category);
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