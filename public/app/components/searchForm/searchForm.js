(function() {
    'use strict';

    angular.module('app')
        .controller('searchFormController', ['crudHelper', 'search', 'user', '_', searchFormController])
        .directive('searchForm', function() {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                controller: 'searchFormController',
                controllerAs: 'ctrl',
                templateUrl: 'app/components/searchForm/searchForm.html'
            };
        });

    function searchFormController(crudHelper, search, user, _) {
        var vm = this;
        vm.form = {};
        vm.query = {};
        vm.user = user;

        /**
         * Building form
         */
        crudHelper.RA.all('search').customGET('form').then(function(form){
            vm.form = form;
        });

        /**
         * Listening for user inputs
         */
        vm.query.time = 'now';
        $('.time .dropdown-menu a').on('click', function() {
            vm.query.time = $(this).data('value');
            $('.time [data-ref=value]').text($(this).text());
        });

        vm.query.moods = [];
        $('form').on('click', '.moods .icon', function() {
            $(this).toggleClass('active');
            vm.query.moods = _.xor(vm.query.moods, [$(this).data('value')]);
        });

        /**
         * Searching
         */
        vm.search = function() {
            vm.loading = true;
            search.query(vm.query, function() {
                vm.loading = false;
            });
        };
    }
})();