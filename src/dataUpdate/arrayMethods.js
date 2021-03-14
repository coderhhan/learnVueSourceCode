import { def } from "./utils"

export const arrayMethods = Object.create(Array.prototype)

const methods = [
  'push', //插入的数据可能是对象
  'pop',
  'shift',
  'unshift',//插入的数据可能是对象
  'splice',//插入的数据可能是对象
  'sort',
  'reserve'
]

var insertArray = []
methods.forEach(fun=>{
  let tem = methods[fun]
  def(arrayMethods,fun,function(){
    //直接调用吗，this指向window，调用报错 tem(),复原原数组方法
    const result = tem.apply(this,arguments)

    //取出数组原型
    let ob = this.__ob__
    //将实参类数组改为数组
    const args = [...arguments]
    //特殊三种数组会可以写入,需要对写入的数据检测
    switch(fun){
      case 'push':
      case 'unshfit':
        insertArray = args
        break;
      case 'splice':
        insertArray = args.slice(2)
        break 
    }
    //如果有插入对象有数，则用数组检测
    if(insertArray.length >0){
      ob.observeArray(insertArray)
    }
    ob.dep.notify()
   //返回原数组方法的返回值 
   return result
  },false)
})
