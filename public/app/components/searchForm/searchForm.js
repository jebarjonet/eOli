(function() {
    'use strict';

    angular.module('app')
        .controller('searchFormController', ['crudHelper', 'search', '_', '$scope', searchFormController])
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

    function searchFormController(crudHelper, search, _, $scope) {
        var vm = this;
        vm.form = {};
        vm.moods = {};
        vm.query = {};

        vm.query.time = 'now';
        crudHelper.RA.all('search').customGET('form').then(function(form){
            vm.form = form;
        });

        $scope.$watchCollection(function() {return vm.moods;}, function(moods) {
            vm.query.moods = [];
            _.forEach(moods, function(v, k) {
                if(v) {
                    vm.query.moods.push(k);
                }
            });
        });

        $('.time .dropdown-menu a').on('click', function() {
            vm.query.time = $(this).data('value');
            $('.time [data-ref=value]').text($(this).text());
        });

        $('form').on('click', '.moods .icon', function() {
            console.log($(this));
            $(this).toggleClass('active');
        });

        vm.search = function() {
            vm.loading = true;
            search.query(vm.query, function() {
                vm.loading = false;
            });
        };
    }
})();