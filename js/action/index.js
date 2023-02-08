import { onThemeChange, onThemeInit, onShowCustomThemeView } from './action_theme'
import { onLoadLanguage } from './action_language';
import { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } from './action_popular';
import { onLoadFavoriteData } from './action_favorite';
import { onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite } from './action_trending';

/**
 * 数据更新的指令，会告诉Reducer如何去处理数据
 */
export default {
    onThemeChange,
    onThemeInit,
    onShowCustomThemeView,
    onRefreshPopular,
    onLoadMorePopular,
    onLoadLanguage,
    onFlushPopularFavorite,
    onLoadFavoriteData,
    onRefreshTrending,
    onLoadMoreTrending,
    onFlushTrendingFavorite,
}