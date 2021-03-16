
import {def} from './utils'
import defineReactive from './defineReactive'
import { arrayMethods } from './arrayMethods'
import observe from './observe'
import Dep from './Dep'
/*
 *Observer 类的目的：将一个正常的的object转换为每个层级的属性都是响应式（可以被检测的）的object对象
*/
export default class Observer {
  constructor(value){
    //每个observer实力上的都会一个dep实例
    this.dep = new Dep()
    //this指的是这个类的实例,__ob__不可枚举属性 false
    def(value,'__ob__',this,false)
      //如果是数组则改写方法
    if(Array.isArray(value)){
      //将数组的七个方法原型改写成检测的
      Object.setPrototypeOf(value,arrayMethods)
      this.observeArray(value)
    }else{
      this.walk(value)
    }
  }
  /*遍历*/
  walk(value){
    for(let key in value){
     defineReactive(value,key)
    }
  }
  /*数组特殊遍历1 */
  observeArray(arr){
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
}