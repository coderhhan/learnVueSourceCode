import Dep from './Dep'
import observe from './observe'

export default function defineReactive(data,key,val) {
  const dep = new Dep()
  if(arguments.length === 2){
    val = data[key]
  } 
  //监测传入的val的内容
  let childD= observe(val)

  Object.defineProperty(data ,key, {
    enumerable:true,
    configurable:true,
    get(){
      console.log('这是获取+'+key+'的属性get')
      //如果当前属于依赖收集阶段，添加依赖
      if(Dep.target){
        dep.depend()
        if(childD) {
          childD.dep.depend()
        }
      }
      return val;
    },
    set(newVlaue){
      console.log('这是获取+'+key+'的属性set')
      if(newVlaue === val) return
      val = newVlaue
       //监测新赋值newVlaue的内容
      childD = observe(newVlaue)

      //发布订阅者模式，通知dep
      dep.notify()
    }
  })
}