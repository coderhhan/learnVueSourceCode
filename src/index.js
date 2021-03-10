import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'


/**diff算法
 * 只有在同一个虚拟节点，才进行精细化比较，最小量化更新。
 * 否则就是暴力删除旧的，插入新的节点
 * 通过 选择器相同及key相同判断。
 * 
 * 只进行同层比较，不会进行跨层比较。
 *  */
const container = document.getElementById('container')
var myvDom = h('ul',{},[
  h('li',{key:'C'},'C'),
  h('li',{key:'B'},'B'),
  h('li',{key:'A'},'A'),
])


 patch(container,myvDom)

 console.log(myvDom)
var myvDom2 = h('ul',{},[
  h('li',{key:'A'},'A'),
  h('li',{key:'B'},'CC'),
  h('li',{key:'C'},'CCC'),
])


const btn = document.getElementsByTagName('button')[0]
btn.onclick= function(){
  console.log(11)
 patch(myvDom,myvDom2)
}