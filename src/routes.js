const {
    addMenuHandler,
    getAllMenuHandler,
    deleteMenuByIdHandler,
} = require ('./handler')

const routes = [ 
    {
        method: 'POST',
        path: '/menus',
        handler: addMenuHandler,
    },
    {
        method: 'GET',
        path: '/menus',
        handler: getAllMenuHandler,
    },

    {
        method: 'DELETE',
        path: '/menus',
        handler: deleteMenuByIdHandler,
    },

];

module.exports = routes;