module.exports = {
    crudModels: [
        {
            endpoint: 'categories',
            model: 'Category',
            crudExtend: ['remove'],
            restExtend: [
                {
                    method: 'get',
                    path: '/:id/count',
                    function: 'count'
                },
                {
                    method: 'get',
                    path: '/count',
                    function: 'countAll'
                }
            ]
        },
        {
            endpoint: 'links',
            model: 'Link'
        },
        {
            endpoint: 'moods',
            model: 'Mood'
        },
        {
            endpoint: 'periods',
            model: 'Period'
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