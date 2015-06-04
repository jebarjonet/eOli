(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksAddController', AdminLinksAddController);

    AdminLinksAddController.$inject = ['Link', 'Category', 'crudHelper', '_', '$state', '$scope'];

    function AdminLinksAddController(Link, Category, crudHelper, _, $state, $scope) {
        var vm = this;
        vm.link = angular.copy(Link.model);
        crudHelper.getAll(vm, 'links', Link);
        crudHelper.getAll(vm, 'categories', Category);

        /**
         * Watching categories selection : if already existing, go to its edition page
         */
        $scope.$watchCollection(function() { return vm.link.categories; }, function(selected) {
            _.forEach(vm.links, function(link) {
                if(_.intersection(_.pluck(link.categories, '_id'), selected).length === 2) {
                    $state.go('admin.links-edit', { id: link._id });
                }
            });
        });

        vm.submit = function() {
            crudHelper.create(vm, Link, vm.link, 'admin.links');
        };
    }
})();