import Dep from './Dep'
var uid = 0
export default class Watcher {
  constructor(data,expression,callback){
    this.id = uid++
    this.data = data
    this.callback = callback
    this.getter = parsePath(expression)
    this.value = this.get()
  }
  run(){
    this.getAndInvoke(this.callback)
  }
  update(){
    this.run()
  }
  //使进入依赖收集阶段
  get(){
   
    Dep.target = this
    const data = this.data
    var value
    try{
      value = this.getter(data)
    }finally{
      Dep.target = null
    }
    return value
  }
  getAndInvoke(cb){
    var temp = this.get()
    if(temp !== this.data ||typeof temp === 'object'){
      const oldValue = this.value
      this.value = temp
      console.log('回调函数')
      cb.call(this.target,temp,oldValue)
    }
  }
}

function parsePath(str){
  const strs = str.split('.')
  return (obj)=>{
    for(let i = 0;i<strs.length;i++){
      if(!obj) return
      obj = obj[strs[i]]
    }
    return obj
  }
}