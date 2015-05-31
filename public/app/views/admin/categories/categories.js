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

        vm.delete = function(category) {
            crudHelper.remove(Category, category._id,
                function() {
                    _.remove(vm.categories, function(n) {
                        return n._id === category._id;
                    });
                }, function(e) {
                    console.error(e);
                }
            );
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