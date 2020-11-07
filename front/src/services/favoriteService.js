import FireStoreDao from '@/utils/firestore/fireStoreDao';

const FavoriteService = {

    list: async () => await FireStoreDao.list('favorites'),

    findById: async id => await FireStoreDao.findById('favorites', id),

    mark: async id => await FireStoreDao.update('favorites', {id, isStar: true}),

    unmark: async id => await FireStoreDao.update('favorites', {id, isStar: false}),
}

module.exports = FavoriteService;
