import Dep from './Dep'
import observe from './observe'
export default function defineReactive(obj,key,value){
  const dep = new Dep()
  if(arguments.length === 2) {
    value = obj[key]
  }
 var childob= observe(value)
  Object.defineProperty(obj,key,{
    enumerable:true,
    configurable:true,
    get(){
      // console.log(`你试图访问${key}属性`)
      if(Dep.target){
        dep.depend()
        if(childob){
          childob.dep.depend()
        }
      }
      return value
    },
    set(newValue){
     if(value === newValue) return 
     value = newValue
     childob= observe(newValue)
     dep.notify()
    }
  })
}