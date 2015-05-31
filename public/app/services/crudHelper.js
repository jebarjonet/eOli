(function(){
    'use strict';

    angular.module('app')
        .service('crudHelper', ['Restangular', '$state', function(Restangular, $state){
            var _this = this;
            angular.extend(_this, {
                get: getForAdmin,
                getAll: getAllForAdmin,
                create: createForAdmin,
                update: updateForAdmin,
                remove: removeForAdmin
            });

            function getForAdmin(controller, Model, objectName, id, callback) {
                controller[objectName] = {};

                get(Model, id, function(res) {
                    controller[objectName] = res;
                    if(callback) {
                        callback(res);
                    }
                });
            }

            function getAllForAdmin(controller, Model, objectName, callback) {
                controller[objectName] = [];

                getAll(Model, function(res) {
                    controller[objectName] = res;
                    if(callback) {
                        callback(res);
                    }
                });
            }

            function createForAdmin(controller, Model, entity, goTo, callbackSuccess, callbackFail) {
                controller.loading = true;

                create(Model, entity,
                    function(res) {
                        if(goTo) {
                            $state.go(goTo);
                        }
                        if(callbackSuccess) {
                            callbackSuccess(res);
                        }
                    }, function(e) {
                        controller.errors = e.data.errors;
                        controller.loading = false;
                        if(callbackFail) {
                            callbackFail(e);
                        }
                    }
                );
            }

            function updateForAdmin(controller, Model, id, entity, goTo, callbackSuccess, callbackFail) {
                controller.loading = true;

                update(Model, id, entity,
                    function(res) {
                        if(goTo) {
                            $state.go(goTo);
                        }
                        if(callbackSuccess) {
                            callbackSuccess(res);
                        }
                    },
                    function(e) {
                        controller.errors = e.data.errors;
                        controller.loading = false;
                        if(callbackFail) {
                            callbackFail(e);
                        }
                    });
            }

            function removeForAdmin(Model, id, goTo, callbackSuccess, callbackFail) {
                remove(Model, id,
                    function() {
                        if(goTo) {
                            $state.go(goTo);
                        }
                        if(callbackSuccess) {
                            callbackSuccess();
                        }
                    }, function(e) {
                        console.error(e);
                        if(callbackFail) {
                            callbackFail(e);
                        }
                    }
                );
            }

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