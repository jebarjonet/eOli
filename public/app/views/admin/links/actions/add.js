(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksAddController', AdminLinksAddController);

    AdminLinksAddController.$inject = ['Link', 'Category', 'Period', 'crudHelper', '$scope'];

    function AdminLinksAddController(Link, Category, Period, crudHelper, $scope) {
        var vm = this;
        vm.link = Link.model;
        crudHelper.getAll(vm, 'categories', Category);
        crudHelper.getAll(vm, 'periods', Period);
    }
})();