import Types from './types'
import LanguageDao from "../expand/LanguageDao";

/**
 * 加载标签
 * @param flagKey
 * @returns {function(*)}
 */
// 这就是使用redux-thunk异步处理库，先获取网络数据，再通过dispatch分发给store，store再交给reducer处理
// 这里的返回值是一个函数，而不是一个对象，这个函数接收dispatch参数
export function onLoadLanguage(flagKey) {
    // 这个函数的入参是dispatch
    // 使用 Redux 中间件（如 redux-thunk）时，你可以在 action 创建函数中返回一个函数，而不是一个简单的 action 对象。
    // 这个返回的函数会接收 dispatch 作为参数。这样，你就可以在 action 创建函数中执行异步操作，然后在适当的时机调用 dispatch 来分发 action。
    return async dispatch => {
        try {
            let languages = await new LanguageDao(flagKey).fetch();
            dispatch({type: Types.LANGUAGE_LOAD_SUCCESS, languages: languages, flag: flagKey})
        } catch (e) {
            console.log(e)
        }
    }
}