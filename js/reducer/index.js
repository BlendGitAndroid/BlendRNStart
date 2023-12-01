const { combineReducers } = require("redux");
import theme from "./reducer_theme";
import language from "./reducer_language"
import popular from "./reducer_popular"
import favorite from "./reducer_favorite"
import trending from "./reducer_trending"

/**
 * 1. 合并reducer
 * Reducer的作用是根据先前的状态和一个表示要执行的操作的动作对象，来计算和返回新的状态。
 * 它接收两个参数：先前的状态和动作对象。然后根据动作的类型来执行相应的逻辑，更新状态并返回新的状态
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