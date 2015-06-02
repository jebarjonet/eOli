module.exports = {
    crudModels: [
        {
            endpoint: 'categories',
            model: 'Category',
            restExtend: [
                {
                    method: 'get',
                    path: '/:id/total',
                    function: 'total'
                }
            ]
        },
        {
            endpoint: 'places',
            model: 'Place',
            crudExtend: ['remove']
        }
    ],
    crudActions: {
        get: {
            method: 'get',
            path: '/:id',
            function: 'get'
        },
        getAll: {
            method: 'get',
            path: '/',
            function: 'getAll'
        },
        create: {
            method: 'post',
            path: '/',
            function: 'create'
        },
        update: {
            method: 'put',
            path: '/:id',
            function: 'update'
        },
        remove: {
            method: 'delete',
            path: '/:id',
            function: 'remove'
        }
    }
};