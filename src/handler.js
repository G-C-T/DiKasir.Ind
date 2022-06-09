const { nanoid } = require('nanoid');
const menu = require('./menu');

const addMenuHandler = (request, h) => {
    console.log(request.payload);
    const{
        nama, stock,
    } = request.payload;

    if (nama === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan ke dalam nota. Mohon isi nama menu yang di-inginkan',
        });
        response.code(400);

        return response;
    }

    const id = nanoid(16);
    const newMenu = {
        id,
        nama,
        stock,
    };
    menu.push(newMenu);
    
    const isSuccess = menu.filter((menu) => menu.id === id).length >0;

    if (isSuccess) {
        const response = h.response ({
            status: 'success',
            message: 'Menu berhasil ditambahkan',
            data: {
                menuId: id,
            },
        });
        response.code(201);

        return response;
    }

    const response = h.response ({
        status: 'error',
        message: 'Menu gagal ditambahkan'
    });
    response.code(500);

    return response;
};

const getAllMenuHandler = (request, h) => {
    const {
        nama,
    } = request.query;

    let filteredMenus = menu;

    if (nama !== undefined) {
        filteredMenus = filteredMenus.filter(m => m.nama.toLowerCase().includes(nama));
        const response = h.response({
            status: 'success',
            data: {
                menus: filteredMenus.map(menu => ({
                    id: menu.id,
                    nama: menu.nama,
                    stock:menu.stock,
                })),
            },
        });
        response.code(200);
    }

    const response = h.response({
        status: 'success',
        data: {
            menus: menu.map((menu) => ({
                id: menu.id,
                nama: menu.nama,
                stock:menu.stock,
            })),
        },
    });
    response.code(200);

    return response;
};

const deleteMenuByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = menu.findIndex((menu) => menu.id === id);

    if (index !== -1) {
        menu.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Menu berhasil dihapus',
        });
        response.code(200);

        return response;
    }

    const response = h.response ({
        status: 'fail',
        message: 'Menu gagal dihapus. Item tidak ditemukan',
    });
    response.code(404);

    return response;
};


module.exports = {
    addMenuHandler,
    getAllMenuHandler,
    deleteMenuByIdHandler,
};

