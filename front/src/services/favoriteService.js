import FireStoreDao from '@/utils/firebase/fireStoreDao';

const FavoriteService = {

    upsert: async video => {

        const favorite = await FireStoreDao.findById('favorites', video.id);
        if (favorite) await FireStoreDao.update('favorites', video)
        else await FireStoreDao.add('favorites', video)
    },

    list: async () => await FireStoreDao.list('favorites'),

    findById: async id => await FireStoreDao.findById('favorites', id),

    toggleFavorite: async video => await FavoriteService.upsert({...video, isFav: !video.isFav}),

    mark: async video => await FavoriteService.upsert({...video, isFav: true}),

    unmark: async video => await FavoriteService.upsert({...video, isFav: false}),

    getFavoriteChecker: async () => {

        const favorites = await FavoriteService.list();
        return videoId => {

            const item = favorites.find(fav => fav.id === videoId);
            return item && item.isFav;
        };
    },
}

export default FavoriteService;
