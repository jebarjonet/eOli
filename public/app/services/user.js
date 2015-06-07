(function(){
    'use strict';

    angular.module('app')
        .service('user', ['$http', function($http){
            var _this = this;
            _this.current = null;

            _this.isLoggedIn = isLoggedIn;
            _this.checkStatus = checkStatus;

            function isLoggedIn() {
                return _this.current !== null;
            }

            function checkStatus(cb) {
                $http.get('/loggedin').success(function(user){
                    if (user) {
                        _this.current = user;
                    } else {
                        _this.current = null;
                    }
                    if(cb) {
                        cb();
                    }
                });
            }
        }]);
})();