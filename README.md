# BlendRNStart
开始个人项目的学习

1.ES5/ES6介绍
变量声明 var会变量提升，let和const

对象属性简写 
    let username='java1234';
    let pwd='123456';
    let obj={
        username,
        pwd
    }
    console.log(obj.username,obj.pwd);

Object.assign对象合并，Object.assign()是对象的静态方法，可以用来复制对象的可枚举属性到目标对象，利用这个特性可以实现对象属性的合并。
    var target={name:'guxin',age:18};
    var source={state:'single'}
    var result=Object.assign(target,source);
    console.log(target,target==result); //true
    可以看到有多个源对象情况也是和一个源对象一样的。没有同名的属性会直接复制到目标对象上，同名的属性后面的属性值会覆盖前面的同名属性值。
    1、Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象，继承属性和不可枚举属性是不能拷贝的。
    2、针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
    3、目标对象自身也会改变
    4、异常会打断后续拷贝任务

解构赋值
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

展开运算符
    function sum(x, y, z) {
        return x + y + z;
    }
    const numbers = [1, 2, 3];
    //不使用延展操作符
    console.log(sum.apply(null, numbers));
    //使用延展操作符
    console.log(sum(...numbers));// 6


模板字符串
    `name: ${name}` 类似于这样的写法
Promise

import和export

https://www.jianshu.com/p/ee10ecb3a20b

2. babel：就是一个编译器，将语法向后兼容，能运行在当前和之前的版本中。

3. flex布局
   有一点是position，relative的left,top是视觉位置改变了，但是其真正的位置没有改变
   releave是相对于父布局的  