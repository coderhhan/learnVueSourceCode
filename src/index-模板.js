import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

//创建patch将函数，让虚拟机节点上树
const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])
//创建虚拟dom
var myVnode1 = h('a',{props:{href:'http://www.atguigu.com'}},'尚硅谷')

const container = document.getElementById('container')

patch(container,myVnode1)

// const container = document.getElementById('container')

// const vnode = h('div#container.two.classes', { on: { click: function(){

// } } }, [
//   h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
//   ' and this is just normal text',
//   h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
// ])
// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode)

// const newVnode = h('div#container.two.classes', { on: { click: function(){

// } } }, [
//   h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
//   ' and this is still just normal text',
//   h('a', { props: { href: '/bar' } }, 'I\'ll take you places!')
// ])
// // Second `patch` invocation
// patch(vnode, newVnode) // Snabbdom efficiently updates the old view to the new state