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
  h('li',{},'测试1'),
  h('li',{},'测试2'),
  h('li',{},'测试3'),
  h('li',{},[h('p',{},h('div',{},'hhh'))]),
])


patch(container,myvDom)

var myvDom2 = h('ul',{},'特性t')

// console.log(myvDom)
const btn = document.getElementsByTagName('button')[0]
btn.onclick= function(){
  console.log(11)
  patch(myvDom,myvDom2)
}