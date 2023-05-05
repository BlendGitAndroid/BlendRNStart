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