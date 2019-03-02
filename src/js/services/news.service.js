import { ENV } from '../config/env';
import { Http } from '../core/http.service';


/** Class representing the news service. */
export class NewsService {
    /**
     * Create news service.
     */
    constructor() {}

    /**
     * Get news.
     * @return {object} new promise.
     */
    getNews(token) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/news`, {headers: {'x-access-token': token}})
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}