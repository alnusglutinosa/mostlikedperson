import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';
import { Routing } from '../core/routing.service';

/** Class representing the news component. */
export class NewsComponent {
    /**
     * Create news component.
     */
    constructor() {
        this._authService = new AuthService();
        this._newsService = new NewsService();
        this._routing = new Routing();
        this._news;
    }

    /**
     * Get the news before the render.
     */
    async beforeRender() {
        if (!this._authService.token) {
            this._routing.navigate('/login');
            throw 'Please login to acces private data';
        }
        
        this._news = await this._newsService.getNews(this._authService.token);
    }

    /**
     * Get a news template.
     * @return {string} news template.
     */
    render() {

        if (!this._news.news) {
            return '';
        }

        return `
        <!-- Component styles -->
        <style>
            ${this._style()}
        </style>
        <!-- Component html -->
        <div class="news__wrap">
            <img class="news__img" src="${this._news.news[0].pictures[0].url}">
        </div>
        <br>
        <p class="news__owner">Owner: <b>${this._news.news[0].owner.full_name}</b> <i>${this._news.news[0].date.substring(0, 10)}</i></p>
    `;
    }

    /**
     * Get the style news template.
     * @return {string} news style.
     */
    _style() {
        return `
            .news__img{
                position: absolute;
                height: auto;
                width: 100%;
                max-width: unset;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
            }
            .news__wrap {
                position: relative;
                overflow: hidden;
                width: 600px;
                height: 300px;
                margin: 25px auto;
            }
            .news__owner {
                text-align: center;
                color: #000;
                font-size: 24px;
            }
            .news__owner b {
                color: #e12ebc;
            }
        `;
    }

    /**
     * After the render.
     */
    afterRender() { }
}