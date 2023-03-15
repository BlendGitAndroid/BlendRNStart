# RN学习记录

APP学习总结：
1. `AppState` 可以告诉应用程序是在前台还是在后台，并在状态改变时通知你。
2. `Modux` 状态管理库
3. React Context的学习，当你不想在组件树中通过逐层传递或者的方式来传递数据时，可以使用来实现跨层级的组件数据传递。
4. refs：(1)可以使用refs来存储DOM节点的引用，及为DOM添加ref     (2)回调refs，会传递一个函数，这个函数接受React组件实例或DOM元素作为参数，以便他们能在
   其他的地方被存储和访问。项目中使用的是第二种。
5. Effect Hook 不编写class的情况下，使用state以及其他的react特性.
6. Promise，使用async和await字段时，这个promise状态变为fulfilled才会执行await后续的代码，所以await后面的代码，相当于包括在.then方法的回调中，如果状态
   变为rejected，你则需要在函数内部try catch，或者进行链式调用进行.catch操作。
7. Axios的使用，网络请求。 
8. 移除RN的库，使用yarn remove xxxx，使用yarn的时候，也是yarn install。
9. yarn.lock里面能看依赖关系。
10. peerDependencies: 是package.json的一个属性，是对等依赖，在npm install时不会被安装，打包项目时，也不会被打包进去。
11. patches：给第三方库打补丁，记录第三方包的补丁。
12. Headless JS: 使用JS在后台执行任务的方法，在后台同步数据，处理推送通知或者是播放音乐等。