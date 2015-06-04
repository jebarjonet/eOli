(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksAddController', AdminLinksAddController);

    AdminLinksAddController.$inject = ['Link', 'Category', 'Period', 'crudHelper'];

    function AdminLinksAddController(Link, Category, Period, crudHelper) {
        var vm = this;
        vm.link = angular.copy(Link.model);
        crudHelper.getAll(vm, 'categories', Category);
        crudHelper.getAll(vm, 'periods', Period);
    }
})();