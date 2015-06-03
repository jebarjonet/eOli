(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminLinksRoute])
        .controller('AdminLinksController', AdminLinksController);

    AdminLinksController.$inject = ['Link', 'crudHelper'];

    function AdminLinksController(Link, crudHelper) {
        var vm = this;
        crudHelper.getAll(vm, 'links', Link);

        vm.remove = function(link) {
            crudHelper.remove(Link, link._id, link, null, function() {
                _.remove(vm.links, function (n) {
                    return n._id === link._id;
                });
            });
        };
    }

    function AdminLinksRoute($stateProvider) {
        $stateProvider
            .state('admin.links-add', {
                url: '/links/add',
                templateUrl: 'app/views/admin/links/form.html',
                controller: 'AdminLinksAddController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Ajouter un lien entre catégories'
                }
            })
            .state('admin.links-edit', {
                url: '/links/edit/:id',
                templateUrl: 'app/views/admin/links/form.html',
                controller: 'AdminLinksEditController',
                controllerAs: 'ctrl',
                data: {
                    title: 'Éditer un lien entre catégories'
                }
            });
    }
})();