import Types from './types'
import LanguageDao from "../expand/LanguageDao";

/**
 * 加载标签
 * @param flagKey
 * @returns {function(*)}
 */
//这就是使用redux-thunk异步处理库，先获取网络数据，再通过dispatch分发给store，store再交给reducer处理
export function onLoadLanguage(flagKey) {
    return async dispatch => {
        try {
            let languages = await new LanguageDao(flagKey).fetch();
            dispatch({type: Types.LANGUAGE_LOAD_SUCCESS, languages: languages, flag: flagKey})
        } catch (e) {
            console.log(e)
        }
    }
}