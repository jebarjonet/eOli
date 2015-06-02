module.exports = {
    crudModels: [
        {
            endpoint: 'categories',
            model: 'Category',
            crudExtend: ['remove'],
            restExtend: [
                {
                    method: 'get',
                    path: '/:id/total',
                    function: 'total'
                },
                {
                    method: 'get',
                    path: '/total',
                    function: 'totalAll'
                },
            ]
        },
        {
            endpoint: 'places',
            model: 'Place'
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