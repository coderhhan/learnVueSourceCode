import vnode from './vnode'

// 编一个低配版的h函数，必须接受三个参数
//调用时必须是以下三种形态
// h（'div',{},文字）
//h（'div',{},[]）
//h（'div',{},h()）
export default function (sel,data,c){
  if(arguments.length !== 3) throw new Error('h函数只支持传三个参数')
  if(typeof c === 'string' && c !== ''){
    return vnode(sel,data,undefined,c,undefined)
  }else if (Array.isArray(c)) {
    let children = []
    for (let i = 0; i < c.length; i++) {
       if(Object.prototype.toString.call(c[i]) !== '[object object]' && c.hasOwnProperty('sel')) throw new Error('传入的数组有项不是h函数')
       children.push(c[i]) 
    }
    return vnode(sel,data,children,undefined,undefined)
  }else if (Object.prototype.toString.call(c) !== '[object object]' && c.hasOwnProperty('sel')){
    let children = [c]
    return vnode(sel,data,children,undefined,undefined)
  }else {
    throw new Error('h函数只支持三种形态')
  }
}