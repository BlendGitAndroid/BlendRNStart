import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import reducers from "../reducer"

/**
 * 自定义log中间件
 */
const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching', action);
    }
    const result = next(action);
    console.log('nextState', store.getState());
    return result;
};

/**
 * 上面的是下面的方法糖
 */
const logger1 = function (store) {
    return function (next) {
        return function (action) {
            if (typeof action === 'function') {
                console.log('dispatching a function');
            } else {
                console.log('dispatching', action);
            }
            //这里的next就是将action继续下发
            const result = next(action);
            console.log('nextState', store.getState());
            return result;
        }
    }
}

const middlewares = [
    thunk,
    logger,
]

/**
 * 2. 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
