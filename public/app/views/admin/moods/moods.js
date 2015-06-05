(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminMoodsRoute])
        .controller('AdminMoodsController', AdminMoodsController);

    AdminMoodsController.$inject = ['Mood', 'crudHelper'];

    function AdminMoodsController(Mood, crudHelper) {
        var vm = this;
        crudHelper.getAll(vm, 'moods', Mood, function() {
            //crudHelper.RA.all('search').customPOST({moods: [vm.moods[0]._id]}).then(function(categories) {
            //    console.log(categories);
            //});
        });

        vm.remove = function(mood) {
            crudHelper.remove(Mood, mood._id, mood, null, function() {
                _.pull(vm.moods, mood);
            });
        };
    }

    function AdminMoodsRoute($stateProvider) {
        $stateProvider
            .state('admin.moods-add', {
                url: '/moods/add',
                templateUrl: 'app/views/admin/moods/form.html',
                controller: 'AdminMoodsAddController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Ajouter une humeur'
                }
            })
            .state('admin.moods-edit', {
                url: '/moods/edit/:id',
                templateUrl: 'app/views/admin/moods/form.html',
                controller: 'AdminMoodsEditController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Éditer une humeur'
                }
            });
    }
})();