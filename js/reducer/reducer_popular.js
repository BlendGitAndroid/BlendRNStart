import Types from '../action/types';

const defaultState = {};
/**
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading:false
 *     },
 *     ios:{
 *         items:[],
 *         isLoading:false
 *     }
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点：store key不固定)；
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {//这种写法是ES6中的计算属性名，这个写法在Redux中通常用于动态地更新或者添加对象的属性。
                    ...state[action.storeName],//这里是先从state中取出storeName对应的对象，并进行解构
                    items: action.items,//原始数据
                    projectModels: action.projectModels,//此次要展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.POPULAR_REFRESH://下拉刷新
            return {
                ...state,
                // 这段代码是在 Redux 的 reducer 中处理 action 的一部分。它使用了 ES6 的计算属性名（Computed Property Name）和对象扩展运算
                // 符（Object Spread Operator）。
                // [action.storeName] 是一个计算属性名，它会将 action.storeName 的值作为属性名。例如，如果 action.storeName 的值是 'popular'，
                // 那么这个属性名就是 'popular'。...state[action.storeName] 是对象扩展运算符的使用，它会将 state[action.storeName] 对象的所有
                // 属性复制到新的对象中。例如，如果 state[action.storeName] 是 { data: [], isLoading: false }，那么扩展后的对象就是 
                // { data: [], isLoading: false }。
                // isLoading: true 和 hideLoadingMore: true 是在新对象中添加或覆盖属性。如果 state[action.storeName] 对象中已经有 isLoading 
                // 或 hideLoadingMore 属性，那么它们的值将被替换为 true。总的来说，这段代码创建了一个新的对象，这个对象包含了 state[action.storeName]
                // 的所有属性，并将 isLoading 和 hideLoadingMore 属性的值设置为 true。这个新的对象将作为 action.storeName 属性的值。
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            };
        case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                },
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.POPULAR_LOAD_MORE_FAIL://上拉加载更多失败
            return {
                ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.FLUSH_POPULAR_FAVORITE://刷新收藏状态
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                },
            };
        default:
            return state;
    }

}
