(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksAddController', AdminLinksAddController);

    AdminLinksAddController.$inject = ['Link', 'Category', 'crudHelper', '_', '$scope'];

    function AdminLinksAddController(Link, Category, crudHelper, _, $scope) {
        var vm = this;
        vm.link = angular.copy(Link.model);
        crudHelper.getAll(vm, 'links', Link);
        crudHelper.getAll(vm, 'categories', Category);

        // Watching categories selection : if already existing, go to its edition page
        $scope.$watchCollection(function() { return vm.link.categories; }, function(selected) {
            var found = false;
            _.forEach(vm.links, function(link) {
                    if(_.intersection(_.pluck(link.categories, '_id'), selected).length === 2) {
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
            crudHelper.create(vm, Link, vm.link, 'admin.links');
        };
    }
})();