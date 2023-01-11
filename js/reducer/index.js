const { combineReducers } = require("redux");
import theme from "./reducer_theme"

/**
 * 1. 合并reducer
 */
const index = combineReducers(
    {
        theme: theme,
    }
)

export default index;