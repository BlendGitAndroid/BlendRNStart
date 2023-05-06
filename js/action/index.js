import { onThemeChange, onThemeInit, onShowCustomThemeView } from './action_theme'
import { onLoadLanguage } from './action_language';
import { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } from './action_popular';
import { onLoadFavoriteData } from './action_favorite';
import { onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite } from './action_trending';

/**
 * 可以使用bindActionCreators来做这一部分的操作
 * 
 * 数据更新的指令，会告诉Reducer如何去处理数据，这里是对象的简单写法，当属性名和属性值一样的时候，可以简写
 * 下面写出了三种方式
 */
export default {
    onThemeChange: onThemeChange,
    onThemeInit,
    onShowCustomThemeView1: onShowCustomThemeView,
    onRefreshPopular,
    onLoadMorePopular,
    onLoadLanguage,
    onFlushPopularFavorite,
    onLoadFavoriteData,
    onRefreshTrending,
    onLoadMoreTrending,
    onFlushTrendingFavorite,
}