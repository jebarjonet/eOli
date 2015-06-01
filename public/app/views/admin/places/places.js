(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminPlacesRoute])
        .controller('AdminPlacesController', AdminPlacesController);

    AdminPlacesController.$inject = ['Place', 'crudHelper'];

    function AdminPlacesController(Place, crudHelper) {
        var vm = this;
        crudHelper.getAll(vm, 'places', Place);

        vm.remove = function(place) {
             crudHelper.remove(Place, place._id, null, function() {
                 _.remove(vm.places, function (n) {
                     return n._id === place._id;
                 });
             });
        };
    }

    function AdminPlacesRoute($stateProvider) {
        $stateProvider
            .state('admin.places-add', {
                url: '/places/add',
                templateUrl: 'app/views/admin/places/form.html',
                controller: 'AdminPlacesAddController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Ajouter un lieu'
                }
            })
            .state('admin.places-edit', {
                url: '/places/edit/:id',
                templateUrl: 'app/views/admin/places/form.html',
                controller: 'AdminPlacesEditController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Éditer un lieu'
                }
            });
    }
})();