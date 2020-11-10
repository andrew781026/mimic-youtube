/**
 * 參考資料 :
 *     https://developers.google.com/youtube/v3/quickstart/nodejs
 *     https://medium.com/%E5%B0%8F%E9%83%AD-%E0%B9%80%E0%B8%88%E0%B8%99/%E8%8F%9C%E9%B3%A5%E5%B7%A5%E7%A8%8B%E5%B8%AB-youtube-data-api-%E8%BC%89%E5%85%A5%E6%92%AD%E6%94%BE%E6%B8%85%E5%96%AE%E4%B8%A6%E5%88%87%E6%8F%9B%E6%AD%8C%E6%9B%B2-356d8e454ca3
 *     https://developers.google.com/youtube/v3/docs/videos/list
 * */
const axios = require('axios');
const API_KEY = require('./youtubeConfig.json').apiKey;

/**
 * part 中可填寫的參數
 *   🔸 contentDetails - 影片詳細資訊 ( 影片長度 ...等 )
 *   🔸 fileDetails   -
 *   🔸 id   - 影片編號
 *   🔸 liveStreamingDetails
 *   🔸 localizations
 *   🔸 player
 *   🔸 processingDetails
 *   🔸 recordingDetails
 *   🔸 snippet - channelId, title, description, tags, and categoryId
 *   🔸 status
 *   🔸 suggestions
 *   🔸 topicDetails
 * */

/**
 * 列表 Youtube 上的影片
 * @param {string} id - Youtube 影片編號
 * @param {string} part - 必填，把需要的回傳資訊列表出來
 * @param {string} chart - 圖表類型，目前只有參數 mostPopular 可用，用於回傳指定 "地區" 與 "類型" 最受歡迎的影片
 * @param {number} maxResults - 回傳筆數上限，預設為五筆資料，可以設定 1 ~ 50
 * @param {string} myRating - OAuth 後才能用的參數，參數： like / dislike 列表出個人喜歡與不喜歡的影片
 * @param {string=} pageToken - 分頁時查詢上一頁 & 下一頁所用的 token
 * @param {string=} regionCode - 區域代碼
 * @param {string=} videoCategoryId - 影片分類編號
 */
const listVideo = async ({
                             id,
                             part,
                             chart,
                             maxResults,
                             myRating,
                             pageToken,
                             regionCode,
                             videoCategoryId
                         }) => {

    // list the video you want to search
    const res = await axios.get('https://www.googleapis.com/youtube/v3/videos',
        {
            params: {
                id,
                chart,
                part,
                maxResults,
                myRating,
                pageToken,
                regionCode,
                videoCategoryId,
                key: API_KEY, // 使用 API 只能取得公開的播放清單
            }
        });

    return res.data;
};


/**
 * 查詢 Youtube 上的影片
 * @param {string} part - 必填，把需要的回傳資訊列表出來
 * @param {number} maxResults - 回傳筆數上限，預設為五筆資料，可以設定 1 ~ 50
 * @param {string=} pageToken - 分頁時查詢上一頁 & 下一頁所用的 token
 * @param {string=} regionCode - 區域代碼
 * @param {string=} videoCategoryId - 影片分類編號
 * @param {string} q - 查詢文字
 */
const searchVideo = async ({
                               part,
                               maxResults,
                               q,
                               pageToken,
                               regionCode,
                               videoCategoryId
                           }) => {

    // list the video you want to search
    const res = await axios.get('https://youtube.googleapis.com/youtube/v3/search',
        {
            params: {
                part,
                q,
                maxResults,
                pageToken,
                regionCode,
                videoCategoryId,
                key: API_KEY, // 使用 API 只能取得公開的播放清單
            }
        });

    return res.data;
};


const YoutubeUtils = {listVideo, searchVideo};

export default YoutubeUtils;
