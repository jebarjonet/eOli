(function() {
    'use strict';

    angular.module('app')
        .controller('searchFormController', ['crudHelper', '_', '$scope', searchFormController])
        .directive('searchForm', function() {
            return {
                restrict: 'E',
                scope: {},
                controller: 'searchFormController',
                controllerAs: 'ctrl',
                templateUrl: 'app/components/searchForm/searchForm.html'
            };
        });

    function searchFormController(crudHelper, _, $scope) {
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

        vm.search = function() {

        };
    }
})();