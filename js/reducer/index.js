const { combineReducers } = require("redux");
import theme from "./reducer_theme"

/**
 * 1. 合并reducer
 * 帮助store处理(初始化、修改、删除)数据的方法
 */
const index = combineReducers(
    {
        theme: theme,
    }
)

export default index;