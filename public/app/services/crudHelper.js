(function(){
    'use strict';

    angular.module('app')
        .service('crudHelper', ['Restangular', 'toasts', '$state', function(Restangular, toasts, $state){
            var _this = this;
            angular.extend(_this, {
                get: getForAdmin,
                getAll: getAllForAdmin,
                create: createForAdmin,
                update: updateForAdmin,
                remove: removeForAdmin
            });

            function getForAdmin(controller, objectName, Model, id, cb) {
                controller[objectName] = {};

                get(Model, id, function(res) {
                    controller[objectName] = res;
                    if(cb) {
                        cb(res);
                    }
                });
            }

            function getAllForAdmin(controller, objectName, Model, cb) {
                controller[objectName] = [];

                getAll(Model, function(res) {
                    controller[objectName] = res;
                    if(cb) {
                        cb(res);
                    }
                });
            }

            function createForAdmin(controller, Model, entity, goTo, cbSuccess, cbFail) {
                controller.loading = true;

                create(Model, entity,
                    function(res) {
                        toasts.add(entity.name + ' créé avec succès');
                        if(goTo) {
                            $state.go(goTo);
                        }
                        if(cbSuccess) {
                            cbSuccess(res);
                        }
                    }, function(e) {
                        controller.errors = e.data.errors;
                        controller.loading = false;
                        if(cbFail) {
                            cbFail(e);
                        }
                    }
                );
            }

            function updateForAdmin(controller, Model, id, entity, goTo, cbSuccess, cbFail) {
                controller.loading = true;

                update(Model, id, entity,
                    function(res) {
                        toasts.add(entity.name + ' édité avec succès');
                        if(goTo) {
                            $state.go(goTo);
                        }
                        if(cbSuccess) {
                            cbSuccess(res);
                        }
                    },
                    function(e) {
                        controller.errors = e.data.errors;
                        controller.loading = false;
                        if(cbFail) {
                            cbFail(e);
                        }
                    });
            }

            function removeForAdmin(Model, id, entity, goTo, cbSuccess, cbFail) {
                remove(Model, id,
                    function() {
                        toasts.add(entity.name + ' supprimé avec succès');
                        if(goTo) {
                            $state.go(goTo);
                        }
                        if(cbSuccess) {
                            cbSuccess();
                        }
                    }, function(e) {
                        console.error(e);
                        toasts.add('Impossible de supprimer ' + entity.name, true);
                        if(cbFail) {
                            cbFail(e);
                        }
                    }
                );
            }

            function get(Model, id, cb) {
                Restangular.one(Model.endpoint, id).get().then(function(res) {
                    cb(res);
                });
            }

            function getAll(Model, cb) {
                Restangular.all(Model.endpoint).getList().then(function(res) {
                    cb(res);
                });
            }

            function create(Model, entity, cbSuccess, cbFail) {
                Restangular.one(Model.endpoint).customPOST(entity).then(function(res) {
                    cbSuccess(res);
                }, function(e) {
                    cbFail(e);
                });
            }

            function update(Model, id, entity, cbSuccess, cbFail) {
                Restangular.one(Model.endpoint, id).customPUT(entity).then(function(res) {
                    cbSuccess(res);
                }, function(e) {
                    cbFail(e);
                });
            }

            function remove(Model, id, cbSuccess, cbFail) {
                Restangular.one(Model.endpoint, id).customDELETE().then(function() {
                    cbSuccess();
                }, function(e) {
                    cbFail(e);
                });
            }
        }]);
})();