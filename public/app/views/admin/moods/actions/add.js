(function(){
    'use strict';

    angular.module('app')
        .controller('AdminMoodsAddController', AdminMoodsAddController);

    AdminMoodsAddController.$inject = ['Mood', 'Category', 'crudHelper'];

    function AdminMoodsAddController(Mood, Category, crudHelper) {
        var vm = this;
        vm.mood = angular.copy(Mood.model);
        crudHelper.getAll(vm, 'categories', Category);

        vm.searchCategory = function(query) {
            return _.filter(vm.categories, function(category) {
                return category.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        };

        vm.submit = function() {
            crudHelper.create(vm, Mood, vm.mood, 'admin.moods');
        };
    }
})();