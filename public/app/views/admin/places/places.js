(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminPlacesRoute])
        .controller('AdminPlacesController', AdminPlacesController);

    AdminPlacesController.$inject = ['Place', 'crudHelper', '$q'];

    function AdminPlacesController(Place, crudHelper, $q) {
        var vm = this;
        vm.places = [];
        vm.filter = '';

        var searching = null;

        vm.search = function() {
            var promise = $q.defer();
            crudHelper.RA.all(Place.endpoint).getList({limit: 50, filter: vm.filter}).then(
                function(places) {
                    vm.places = places;
                    promise.resolve();
                }, function() {
                    promise.reject();
                }
            );
            return promise;
        };
        searching = vm.search();

        vm.research = function() {
            searching.resolve();
            vm.search();
        };

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