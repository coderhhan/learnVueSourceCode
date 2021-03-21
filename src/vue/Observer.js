import {def} from './utils'
import defineReactive from './defineReactive'
import {arrayObj} from './arrayMethods'
import observe from './observe'
import Dep from './Dep'
export default class Observer{
  constructor(value){
    this.dep = new Dep()
    console.log('这里是构造器',value)
    def(value,'__ob__',this,false)

    if(Array.isArray(value)){
      Object.setPrototypeOf(value,arrayObj)
      this.arrayWalk(value)
    }else{
      this.walk(value)
    }
  }

  walk(value){
    for(let key in value){
      console.log(key,value)
      defineReactive(value,key)
    }
  }
  arrayWalk(value){
    for(let key in value){
      observe(value[key])
    }
  }
}