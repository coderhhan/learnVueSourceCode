import h from './mysnabbdom/h'

var myvDom = h('div',{},[
  h('a',{},'测试1'),
  h('a',{},'测试2'),
  h('a',{},'测试3'),
  h('a',{},h('p',{},'p标签')),
])

console.log(myvDom)