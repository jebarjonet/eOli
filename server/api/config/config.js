module.exports = {
    crudModels: [
        {
            endpoint: 'categories',
            model: 'Category'
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
            crudFunction: 'get'
        },
        getAll: {
            method: 'get',
            path: '/',
            crudFunction: 'getAll'
        },
        create: {
            method: 'post',
            path: '/',
            crudFunction: 'create'
        },
        update: {
            method: 'put',
            path: '/:id',
            crudFunction: 'update'
        },
        remove: {
            method: 'delete',
            path: '/:id',
            crudFunction: 'remove'
        }
    }
};