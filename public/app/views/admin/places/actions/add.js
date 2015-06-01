(function(){
    'use strict';

    angular.module('app')
        .controller('AdminPlacesAddController', AdminPlacesAddController);

    AdminPlacesAddController.$inject = ['Place', 'Category', 'crudHelper'];

    function AdminPlacesAddController(Place, Category, crudHelper) {
        var vm = this;
        vm.loading = false;
        vm.place = {
            name: 'Tour Eiffel'
        };
        crudHelper.getAll(vm, 'categories', Category);

        vm.find = function() {
            googleCompletePlace(vm.place);
        };

        vm.submit = function() {
            crudHelper.create(vm, Place, vm.place, 'admin.places');
        };

        function googleFindPlace(place, callback) {
            if(place.name) {
                var res = {
                    address: '3 rue des arbres',
                    lat: '48.864365',
                    lng: '2.314042'
                };
                callback(res);
            }
            return;
        }

        function googleCompletePlace(place) {
            if(place.name) {
                googleFindPlace(place, function(res) {
                    _.merge(place, res);
                });
            }
            return;
        }
    }
})();


