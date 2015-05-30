module.exports = {
    mongodb: {
        host: 'localhost',
        database: 'eOli'
    },
    apiModels: [
        {
            route: 'categories',
            model: 'Category'
        },
        {
            route: 'places',
            model: 'Place'
        }
    ]
};