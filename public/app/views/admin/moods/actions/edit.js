(function(){
    'use strict';

    angular.module('app')
        .controller('AdminMoodsEditController', AdminMoodsEditController);

    AdminMoodsEditController.$inject = ['Mood', 'Category', 'crudHelper', '$state'];

    function AdminMoodsEditController(Mood, Category, crudHelper, $state) {
        var vm = this;
        vm.deletable = true;
        crudHelper.get(vm, 'mood', Mood, $state.params.id);
        crudHelper.getAll(vm, 'categories', Category);

        vm.searchCategory = function(query) {
            return _.filter(vm.categories, function(category) {
                return category.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        };

        vm.submit = function() {
            crudHelper.update(vm, Mood, $state.params.id, vm.mood, 'admin.moods');
        };

        vm.remove = function() {
            crudHelper.remove(Mood, vm.mood._id, vm.mood, 'admin.moods');
        };
    }
})();