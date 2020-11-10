import YoutubeUtils from '@/utils/youtube/youtubeUtils';
import FavoriteService from './favoriteService';

class VideoService {

    static durationParse = videoLength => {

        if (!videoLength) return '';

        // youtube 給出的時間資訊 PT2H3M8S , 需要轉換格式
        const timeArr = videoLength.replace('PT', '').split(/[HMS]/);

        const padLeft = (arr, index) => {

            const num = arr[index];

            if (!num) return '00';
            else if (num.length === 1) return `0${num}`;
            else return num;
        }

        if (timeArr.length === 2) return `00:00:${padLeft(timeArr, 0)}`;
        else if (timeArr.length === 3) return `00:${padLeft(timeArr, 0)}:${padLeft(timeArr, 1)}`;
        else if (timeArr.length === 4) return `${padLeft(timeArr, 0)}:${padLeft(timeArr, 1)}:${padLeft(timeArr, 2)}`;
        else return '';
    };

    // 查出 100 筆影片資訊
    static getVideos = async (searchText) => {

        const favoriteChecker = await FavoriteService.getFavoriteChecker();
        const getVideoIds = arr => arr.map(item => item.id.videoId);

        const searchConfig = {
            maxResults: 50,
            q: searchText,
            part: 'snippet',
            chart: 'mostPopular',
            regionCode: 'TW'
        };

        const getListConfig = (videoIds, pageNumber = 1) => ({

            id: videoIds.slice(50 * (pageNumber - 1), 50 * pageNumber).join(','),
            maxResults: 50,
            part: 'snippet,contentDetails',
            regionCode: 'TW'
        });

        const tempVideos01 = await YoutubeUtils.searchVideo(searchConfig);
        const tempVideos02 = await YoutubeUtils.searchVideo({...searchConfig, pageToken: tempVideos01.nextPageToken,});
        const tempVideos03 = await YoutubeUtils.searchVideo({...searchConfig, pageToken: tempVideos02.nextPageToken,});

        const tempVideos = [...tempVideos01.items, ...tempVideos02.items, ...tempVideos03.items];

        const videoIds = [...new Set(getVideoIds(tempVideos))];

        const nextPageToken = tempVideos01.nextPageToken;
        const prevPageToken = tempVideos01.prevPageToken;

        // 需要處理重複的影片
        const data01 = await YoutubeUtils.listVideo(getListConfig(videoIds, 1));
        const data02 = await YoutubeUtils.listVideo(getListConfig(videoIds, 2));
        const data03 = await YoutubeUtils.listVideo(getListConfig(videoIds, 3));

        const videos = [...data01.items, ...data02.items, ...data03.items].map(item => {

            const snippet = item.snippet;
            const contentDetails = item.contentDetails;

            return {
                org: item,
                id: item.id,
                duration: contentDetails.duration,   // PT2H37M38S
                length: VideoService.durationParse(contentDetails.duration),   // PT2H37M38S
                publishedAt: snippet.publishedAt,
                title: snippet.title,
                description: snippet.description,
                img: snippet.thumbnails.high.url,
                isFav: favoriteChecker(item.id),
            }
        });

        return {videos, nextPageToken, prevPageToken};
    };


    // 列出所有喜好的影片
    static getFavoriteVideos = async () => {

        const videos = await FavoriteService.list();
        return videos.filter(item => item.isFav);
    };

}

export default VideoService;
