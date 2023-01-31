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
    // logger,
]

/**
 * 2. 创建store
 * 
 * Redux中带有推送功能的数据仓库
 * 
 * 会将整个应用状态(其实也就是数据)存储到到一个地方，称为store
 * 这个store里面保存一棵状态树(state tree)
 * 
 * 组件改变state的唯一方法是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，于是state完成更新
 */
export default createStore(reducers, applyMiddleware(...middlewares));
