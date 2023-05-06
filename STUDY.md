# RN学习记录

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
13. ES5/ES6介绍
变量声明 var会变量提升，let和const
14. 对象属性简写 
    let username='java1234';
    let pwd='123456';
    let obj={
        username,
        pwd
    }
    console.log(obj.username,obj.pwd);

15. Object.assign对象合并，Object.assign()是对象的静态方法，可以用来复制对象的可枚举属性到目标对象，利用这个特性可以实现对象属性的合并。
    var target={name:'guxin',age:18};
    var source={state:'single'}
    var result=Object.assign(target,source);
    console.log(target,target==result); //true
    可以看到有多个源对象情况也是和一个源对象一样的。没有同名的属性会直接复制到目标对象上，同名的属性后面的属性值会覆盖前面的同名属性值。
    1、Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象，继承属性和不可枚举属性是不能拷贝的。
    2、针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
    3、目标对象自身也会改变
    4、异常会打断后续拷贝任务

16. 解构赋值
    解构赋值语法是JavaScript的一种表达式，可以方便的从数组或者对象中快速提取值赋给定义的变量。
    数组：
    var foo = ["one", "two", "three", "four"];
    var [one, two, three] = foo;
    console.log(one); // "one"
    console.log(two); // "two"
    console.log(three); // "three
    还可以交换变量：
    var a = 1;
    var b = 3;
    [a, b] = [b, a];
    console.log(a); // 3
    console.log(b); // 1
    对象：
    const student = {
    name:'Ming',
    age:'18',
    city:'Shanghai'  
    };
    const {name,age,city} = student;
    console.log(name); // "Ming"
    console.log(age); // "18"
    console.log(city); // "Shanghai"

17. 展开运算符
    function sum(x, y, z) {
        return x + y + z;
    }
    const numbers = [1, 2, 3];
    //不使用延展操作符
    console.log(sum.apply(null, numbers));
    //使用延展操作符
    console.log(sum(...numbers));// 6


18. 模板字符串
    `name: ${name}` 类似于这样的写法

19. babel：就是一个编译器，将语法向后兼容，能运行在当前和之前的版本中。

20. flex布局
   有一点是position，relative的left,top是视觉位置改变了，但是其真正的位置没有改变
   releave是相对于父布局的  

21. react-navigation本项目使用的是4.x版本的，但是小红书项目，使用的是6.x版本的，需要根据官网看使用说明：
https://reactnavigation.org/docs/4.x/getting-started

22. redux的使用。
1）为什么需要redux：redux是一个数据管理框架，它提供了一个叫store的统一数据存储的仓库。store就像是一个数据管理的中间人，让组件之间无需直接进行数据传递。
   其整体思路是：组件获取数据的时候，所有的数据都是在store中，修改数据的逻辑都是在reducer中，reducer处理完数据后交给store，store再返回给component进行展示；
                组件修改数据的时候，先发送一个action指令，这个指令到达store，通过store传给reducer，经过reducer逻辑处理后，数据再传给store，这样就展示到component组件上了。
    总体来看，就是使用store将component和reducer链接起来，store->component用于展示数据，store<->reducer用于逻辑处理
    整个流程图：
    ActionCreators ---> Store <---> Reducers
       ^                  |
       |                  
        -------------- Component 


2）使用步骤：
   1. 创建store。
   2. 创建reducer，reducer返回什么，就在store中能拿到什么。store和reducer是通过Provider建立关系。
   3. 使用connect，系统有很多组件，但是该传给哪一个组件，需要在component中使用connect。具体的使用就是，
   4. 使用connect获取数据：connect(State,Dispact)(component)，这个State中存放了存储了整个应用store的数据，从state中取出需要的数据，并通过props传给组件， 组件就能使用了
   5. 使用connect修改数据:不能直接操作store，需要通过action，组件的触发，需要使用dispatch，传递给action（props.dispatch({type: "指令"})），传递的action通过store给到了reducer，reducer里面的处理函数，第一个参数是state，第二个是action，action里面就包含了刚刚传递的指令
   6. 使用connet修改数据，传递参数：就是在props.dispatch({type: "指令"})后面加上payload，props.dispatch({type: "指令"，payload: "额外的参数"})，就可以在reducer中通过action.payload来获取到了，本质还是一个对象的传递。
   7. props.dispatch在项目中可能手写的很多,可以使用bindActionCreators进行自动组装,使用方法是...bindActionCreators({{指令1},{指令2},{指令3}},dispatch),在对象里面包裹一个对象是不行的,所以可以使用...操作符将对象展开
   8. reducer的拆分与合并,使用combineReducers进行合并。
   9. MiddleWare中间件，在Action和Store之间增加一个处理过程。
       ActionCreators ---> MiddleWare ---> Store <---> Reducers
       ^                                      ^
       |                                      |
        -------------------------------- Component 
    10. 在redux中是同步的，在reducer中计算数据， 但是当需要异步计算数据的时候，不应该放在reducer中，这个时候就需要借助中间件redux-thunk，在action中返回一个函数，在这个函数中接收dispatch，并且完成异步操作；当完成异步操作后，再次调用dispatch将数据交给store，store再交给reducer处理数据，就和之前的流程一样了。
    redux-thunk是redux的异步请求库，因为redux是同步的，使用的时候，将redux放入middlewares中，执行createStore(store, ...middlewares)就可以了