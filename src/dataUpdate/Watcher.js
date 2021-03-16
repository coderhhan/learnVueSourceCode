import Dep from "./Dep"

var uid = 0
export default class Watcher{
  constructor(target,expression,callback){
    console.log('我是Watcher类的构造器')
    this.target = target
    this.id = uid++
    this.getter = parsePath(expression) //getter 获得器获得返回的函数
    this.callback = callback
    this.value = this.get()
  }
  update(){
    console.log('调了update 方法')
    this.run()
  }
  get(){
    //进入依赖收集阶段,让全局的deptarget 设为watcher实例本身
    Dep.target = this

    const obj = this.target
    console.log('obj',obj)
    var value
    try {
      value = this.getter(obj)
    } finally{
      Dep.target = null
    }

     return value
  }

  run(){
    console.log('run 方法')
    this.getAndInvoker(this.callback)
  }
  getAndInvoker(cb){
    console.log('getAndInvoker 方法')
    const value = this.get()
  
    if(value !== this.value || typeof value === 'object'){
      const oldValue = this.value
      this.value = value
      cb.call(this.target,value,oldValue)
    }
  }
}

function parsePath(expression){
  var arr = expression.split('.')
  return (obj)=>{
    for (let index = 0; index < arr.length; index++) {
      if(!obj) return
      obj = obj[arr[index]];
      console.log(obj)
    }
    return obj
  }
}