(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksEditController', AdminLinksEditController);

    AdminLinksEditController.$inject = ['Link', 'Category', 'crudHelper', '_', '$state', '$scope'];

    function AdminLinksEditController(Link, Category, crudHelper, _, $state, $scope) {
        var vm = this;
        vm.deletable = true;
        crudHelper.get(vm, 'link', Link, $state.params.id, function() {
            vm.link.categories = _.map(vm.link.categories, function(category) {
                return category._id;
            });
        });
        crudHelper.getAll(vm, 'links', Link);
        crudHelper.getAll(vm, 'categories', Category);

        // Watching categories selection : if already existing, go to its edition page
        $scope.$watchCollection(function() { return vm.link.categories; }, function(selected) {
            var found = false;
            _.forEach(vm.links, function(link) {
                if(_.intersection(_.pluck(link.categories, '_id'), selected).length === 2 && link._id !== $state.params.id) {
                    found = link._id;
                }
            });
            if(found) {
                vm.existing = found;
                vm.disabled = true;
            } else {
                vm.existing = false;
                vm.disabled = false;
            }
        });

        vm.submit = function() {
            crudHelper.update(vm, Link, $state.params.id, vm.link, 'admin.links');
        };

        vm.remove = function() {
            crudHelper.remove(Link, vm.link._id, vm.link, 'admin.links');
        };
    }
})();