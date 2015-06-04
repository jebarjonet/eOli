(function(){
    'use strict';

    angular.module('app')
        .controller('AdminLinksEditController', AdminLinksEditController);

    AdminLinksEditController.$inject = ['Link', 'Period', 'crudHelper', '$state'];

    function AdminLinksEditController(Link, Period, crudHelper, $state) {
        var vm = this;

    }
})();