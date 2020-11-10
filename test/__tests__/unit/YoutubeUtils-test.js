import YoutubeUtils from '@/utils/youtube/youtubeUtils';

// TODO 需要讓 Jest 可以使用 import . export
describe('測試 ', () => {

    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000;
    });

    it('查詢影片:編號 coZbOM6E47I', async () => {

        // 下方區塊需要放入單元測試中
        const data = await YoutubeUtils.searchVideo({part: 'snippet,contentDetails', id: 'coZbOM6E47I'})

        const snippets = data.items.map(item => {

            const snippet = item.snippet;
            const contentDetails = item.contentDetails;

            return {
                contentDetails: contentDetails.duration,   // PT2H37M38S
                publishedAt: snippet.publishedAt,
                title: snippet.title,
                description: snippet.description,
                thumbnails: snippet.thumbnails.standard,
            }
        })

        const item = data.items[0];

        expect(item.snippet.title).toBeDefined();               // 標題
        expect(item.snippet.description).toBeDefined();         // 描述
        expect(item.snippet.publishedAt).toBeDefined();         // 發布時間
        expect(item.snippet.thumbnails.standard).toBeDefined(); // 圖片
        expect(item.contentDetails.duration).toBeDefined();     // 影片長度

        // 如果要了解回傳的資料結構可參考 youtube-video-sample-info.json
        // console.log(JSON.stringify(data));
    })

})