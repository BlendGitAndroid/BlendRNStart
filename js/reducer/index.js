const { combineReducers } = require("redux");
import theme from "./reducer_theme";
import language from "./reducer_language"
import popular from "./reducer_popular"
import favorite from "./reducer_favorite"
import trending from "./reducer_trending"

/**
 * 1. 合并reducer
 * 帮助store处理(初始化、修改、删除)数据的方法
 */
const index = combineReducers(
    {
        theme: theme,
        popular: popular,
        language: language,
        favorite: favorite,
        trending: trending,
    }
)

export default index;