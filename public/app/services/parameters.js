(function(){
    'use strict';

    angular.module('app')
        .service('parameters', [function(){
            var _this = this;
            angular.merge(_this, {
                mapboxKey: 'pk.eyJ1IjoibWl6dXIiLCJhIjoiNDEyN2MzMDdmMzdkZThiYWJjMmZjODY1YWU1NDA4ZTMifQ.cPQxLYvrKsZN5sVWs42hzQ'
            });
        }]);
})();