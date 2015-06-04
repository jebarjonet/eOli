(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', AdminLinksRoute])
        .controller('AdminLinksController', AdminLinksController);

    AdminLinksController.$inject = ['Link', 'Period', 'crudHelper', '_'];

    function AdminLinksController(Link, Period, crudHelper, _) {
        var vm = this;
        crudHelper.getAll(vm, 'links', Link, function() {
            crudHelper.getAll(vm, 'periods', Period, function() {
                vm.links = _.map(vm.links, function(link) {
                     link.relations = _.map(link.relations, function(relation) {
                         relation.period = _.findWhere(vm.periods, { _id: relation.period });
                         return relation;
                    });
                    return link;
                });
            });
        });

        vm.remove = function(link) {
            crudHelper.remove(Link, link._id, link, null, function() {
                _.pull(vm.links, link);
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