//***********************开始吧  ************************* */


//map:
//fn 函数,context 上下文
const thatMap=function (fn,context) {
    let arr=Array.prototype.splice.call(this)
    let mapedArr=[]
    for(let i=0 ;i<arr.length; i++){
        if(!arr.hasOwnproperty(i)) continue
        mapedArr.push(fn.call(context,arr[i],i,this))
    }
    return mapedArr
  }


  //filter

const thatFilter=function (fn,context) {
    let arr=Array.prototype.splice.call(this)
    let mapedArr=[]
    for(let i=0 ;i<arr.length; i++){
        if(!arr.hasOwnproperty(i)) continue
        fn.call(context,arr[i],i,this) && mapedArr.push(arr[i])
    }
    return mapedArr
  }

  //reduce 实现filter

  const thatReduce=function (fn,context) {
    return this.reduce((pre,cur,index)=>{
        return fn.call((context,cur,index,this)?[...pre,cur]:[...pre])
    })
  }


  //some   

  const thatSome=function (fn,context) {
    let arr=Array.prototype.splice.call(this)
    if(!arr.length) return false
    let flag=false
    for(let i=0 ;i<arr.length; i++){
        if(!arr.hasOwnproperty(i)) continue
        let res =fn.call(context,arr[i],i,this)
        if(res){
            flag=true
            break
        }
    }
    return flag 
  }

  //reduce 
  if ('function' !== typeof Array.prototype.reduce) {
    Array.prototype.reduce = function(callback, opt_initialValue){
      'use strict';
      if (null === this || 'undefined' === typeof this) {
        // At the moment all modern browsers, that support strict mode, have
        // native implementation of Array.prototype.reduce. For instance, IE8
        // does not support strict mode, so this check is actually useless.
        throw new TypeError(
            'Array.prototype.reduce called on null or undefined');
      }
      if ('function' !== typeof callback) {
        throw new TypeError(callback + ' is not a function');
      }
      var index, value,
          length = this.length >>> 0,
          isValueSet = false;
      if (1 < arguments.length) {
        value = opt_initialValue;
        isValueSet = true;
      }
      for (index = 0; length > index; ++index) {
        if (this.hasOwnProperty(index)) {
          if (isValueSet) {
            value = callback(value, this[index], index, this);
          }
          else {
            value = this[index];
            isValueSet = true;
          }
        }
      }
      if (!isValueSet) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      return value;
    };
  }


  //reduce  实现 flat

  const thatFlat=function (depth=1) {
    let arr=Array.prototype.splice.call(this)
    if(depth===0) return arr
    return reduce((pre,cur)=>{
        if(Array.isArray(cur)){
            return [...pre,...thatFlat.call(cur,depth-1)]
        }else{
            return [...pre,cur]
        }
    },[])
  }


  //class

  function inherit(subType,superType) { 
    subType.prototype=Object.create(superType.prototype,{
        constructor:{
            enumrable:false,
            configurable:true,
            writable:true,
            value:superType.constructor
        }
    })
    Object.setPrototypeOf(subType,superType)
   }
   //ES6 的 class 内部是基于寄生组合式继承，它是目前最理想的继承方式，通过 Object.create 方法创造一个空对象，并将这个空对象继承 Object.create 方法的参数，再让子类（subType）的原型对象等于这个空对象，就可以实现子类实例的原型等于这个空对象，而这个空对象的原型又等于父类原型对象（superType.prototype）的继承关系

//而 Object.create 支持第二个参数，即给生成的空对象定义属性和属性描述符/访问器描述符，我们可以给这个空对象定义一个 constructor 属性更加符合默认的继承行为，同时它是不可枚举的内部属性（enumerable:false）

//而 ES6 的 class 允许子类继承父类的静态方法和静态属性，而普通的寄生组合式继承只能做到实例与实例之间的继承，对于类与类之间的继承需要额外定义方法，这里使用 Object.setPrototypeOf 将 superType 设置为 subType 的原型，从而能够从父类中继承静态方法和静态属性



//斐波那契数列及其优化  就是把计算过的函数保存下来，避免再次计算


//new

//1.创建空对象
//2.将构造函数作用域指向新对象，（this指向）
//3.执行构造函数，（为新对象添加属性）
//返回新对象


//async
async function errync(asyncFunc) {
    try{
        let red=await asyncFunc()
        return [null,res]
    } catch(e){
        return [e,null]
    }
}

let [err,res]=await errync(asyncFunc)

//无需每次使用 async/await 都包裹一层 try/catch ，更加的优雅，这里提供另外一个思路，如果使用了 webpack 可以编写一个 loader，分析 AST 语法树，遇到 await 语法，自动注入 try/catch，这样连辅助函数都不需要使用



//发布订阅 EventEmitter

//通过 on 方法注册事件，trigger 方法触发事件，来达到事件之间的松散解耦，并且额外添加了 once 和 off 辅助函数用于注册只触发一次的事件以及注销事件


