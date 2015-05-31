(function(){
    'use strict';

    angular.module('app')
        .service('crudHelper', ['Restangular', function(Restangular){
            var _this = this;
            angular.extend(_this, {
                get: get,
                getAll: getAll,
                create: create,
                update: update,
                remove: remove
            });

            function get(Model, id, callback) {
                Restangular.one(Model.endpoint, id).get().then(function(res) {
                    callback(res);
                });
            }

            function getAll(Model, callback) {
                Restangular.all(Model.endpoint).getList().then(function(res) {
                    callback(res);
                });
            }

            function create(Model, entity, callbackSuccess, callbackFail) {
                Restangular.one(Model.endpoint).customPOST(entity).then(function(res) {
                    callbackSuccess(res);
                }, function(e) {
                    callbackFail(e);
                });
            }

            function update(Model, id, entity, callbackSuccess, callbackFail) {
                Restangular.one(Model.endpoint, id).customPUT(entity).then(function(res) {
                    callbackSuccess(res);
                }, function(e) {
                    callbackFail(e);
                });
            }

            function remove(Model, id, callbackSuccess, callbackFail) {
                Restangular.one(Model.endpoint, id).customDELETE().then(function() {
                    callbackSuccess();
                }, function(e) {
                    callbackFail(e);
                });
            }
        }]);
})();