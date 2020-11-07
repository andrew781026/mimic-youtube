import YoutubeUtils from '@/utils/youtubeUtils';

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

    static getVideos = async pageToken => {

        const tempVideos = await YoutubeUtils.searchVideo({
            pageToken,
            maxResults: 12,
            q: 'amoung us 台灣',
            part: 'snippet',
            chart: 'mostPopular',
            regionCode: 'TW'
        });

        const nextPageToken = tempVideos.nextPageToken;
        const prevPageToken = tempVideos.prevPageToken;

        const videoIds = tempVideos.items.map(item => item.id.videoId).join(',');

        const data = await YoutubeUtils.listVideo({
            id: videoIds,
            part: 'snippet,contentDetails',
            regionCode: 'TW'
        })

        const videos = data.items.map(item => {

            const snippet = item.snippet;
            const contentDetails = item.contentDetails;

            return {
                id: item.id,
                duration: contentDetails.duration,   // PT2H37M38S
                length: VideoService.durationParse(contentDetails.duration),   // PT2H37M38S
                publishedAt: snippet.publishedAt,
                title: snippet.title,
                description: snippet.description,
                img: snippet.thumbnails.high.url,
                isStar: false,
            }
        });

        return {videos, nextPageToken, prevPageToken};
    };

}

export default VideoService;
