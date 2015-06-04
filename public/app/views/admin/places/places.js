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
            crudHelper.remove(Place, place._id, place, null, function() {
                _.pull(vm.places, place);
            });
        };

        vm.toggleActivated = function(place) {
            var newState = !place.activated;
            crudHelper.RA.one(Place.endpoint, place._id).customPUT({activated: newState}).then(function() {
                place.activated = newState;
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