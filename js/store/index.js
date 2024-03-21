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

// redux-thunk 是 Redux 的一个中间件，它允许你在 action 创建函数中返回一个函数，而不是一个简单的 action 对象。这样，你就可以在 action 创建函数中执行
// 异步操作，然后在适当的时机调用 dispatch 来分发 action。
// redux-thunk 中间件会检查每个分发的 action，如果 action 是一个函数，那么它就会调用这个函数，并将 dispatch 和 getState 作为参数传递给这个函数。
// 如果 action 不是一个函数，那么它就会将 action 传递给下一个中间件，或者直接传递给 reducer（如果没有其他中间件）。
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
 * 
 * createStore 是 Redux 库中的一个重要函数，用于创建 Redux store。Redux store 是一个保存整个应用状态的对象，你可以通过它来访问状态，
 * 分发 action，以及订阅状态变化。在一个 Redux 应用中，通常只会有一个单一的 store。你可以通过调用 createStore 函数并传入一个 reducer 
 * 函数来创建这个 store。这样，store就和应用中的所有 reducer 绑定在一起了。
 */
export default createStore(reducers, applyMiddleware(...middlewares));
