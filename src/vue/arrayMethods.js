import {def} from './utils'

export const arrayObj = Object.create(Array.prototype)

const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'splice',
  'sort'
]

var inserted=[]
methods.forEach(fnName=>{
  const fn = arrayObj[fnName]
  def(arrayObj,fnName,function (){
    var result = fn.apply(this,arguments)
    var ob = this.__ob__
    var args = [...arguments]
    switch(fnName){
      case 'push':
      case 'unshift':
        inserted = args  
         break;
      case 'splice':
        inserted = args.slice(2)   
    }
    if(inserted.length >0){
      ob.arrayWalk(inserted)
    }
    return result
  },false)
})